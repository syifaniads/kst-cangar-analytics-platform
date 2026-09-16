import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(
  new URL('../src/theme/assets/js/api.js', import.meta.url),
  'utf8',
);

function createHarness({ token = 'demo-token', nonce = 'demo-nonce', response } = {}) {
  const storage = new Map();
  if (token) storage.set('kst_access_token', token);

  const calls = [];
  let reloads = 0;

  const defaultResponse = {
    status: 200,
    ok: true,
    headers: { get: () => 'application/json; charset=utf-8' },
    json: async () => ({ response: { data: { items: [] } } }),
  };

  const context = {
    console,
    kstConfig: {
      baseUrl: 'https://portfolio.invalid/wp-json/kstcangar/v1',
      nonce,
    },
    localStorage: {
      getItem(key) {
        return storage.get(key) ?? null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
      removeItem(key) {
        storage.delete(key);
      },
    },
    location: {
      reload() {
        reloads += 1;
      },
    },
    fetch: async (url, options) => {
      calls.push({ url, options });
      return response ?? defaultResponse;
    },
  };

  vm.createContext(context);
  vm.runInContext(source, context, { filename: 'api.js' });

  return {
    apiRequest: context.apiRequest,
    calls,
    storage,
    get reloads() {
      return reloads;
    },
  };
}

test('GET request uses runtime REST base URL, bearer token, and WordPress nonce', async () => {
  const h = createHarness();
  const result = await h.apiRequest('/data/booking');

  assert.deepEqual(result, { data: { items: [] } });
  assert.equal(h.calls.length, 1);
  assert.equal(
    h.calls[0].url,
    'https://portfolio.invalid/wp-json/kstcangar/v1/data/booking',
  );
  assert.equal(h.calls[0].options.method, 'GET');
  assert.equal(h.calls[0].options.headers.Authorization, 'Bearer demo-token');
  assert.equal(h.calls[0].options.headers['X-WP-Nonce'], 'demo-nonce');
});

test('PUT is tunneled through POST with X-HTTP-Method-Override and JSON body', async () => {
  const h = createHarness();
  await h.apiRequest('/data/booking/42', 'PUT', { status: 'confirmed' });

  const { options } = h.calls[0];
  assert.equal(options.method, 'POST');
  assert.equal(options.headers['X-HTTP-Method-Override'], 'PUT');
  assert.equal(options.headers['Content-Type'], 'application/json');
  assert.deepEqual(JSON.parse(options.body), { status: 'confirmed' });
});

test('DELETE is tunneled through POST even when no explicit body is supplied', async () => {
  const h = createHarness();
  await h.apiRequest('/data/booking/42', 'DELETE');

  const { options } = h.calls[0];
  assert.equal(options.method, 'POST');
  assert.equal(options.headers['X-HTTP-Method-Override'], 'DELETE');
  assert.equal(options.body, '{}');
});

test('401 clears the stored access token and reloads the page', async () => {
  const h = createHarness({
    response: {
      status: 401,
      ok: false,
      headers: { get: () => 'application/json' },
      json: async () => ({ message: 'Unauthorized' }),
    },
  });

  const result = await h.apiRequest('/data/booking');
  assert.equal(result, undefined);
  assert.equal(h.storage.has('kst_access_token'), false);
  assert.equal(h.reloads, 1);
});

test('non-JSON responses are rejected before parsing', async () => {
  const h = createHarness({
    response: {
      status: 502,
      ok: false,
      headers: { get: () => 'text/html' },
      json: async () => {
        throw new Error('json() should not be called');
      },
    },
  });

  await assert.rejects(
    h.apiRequest('/data/booking'),
    /response non-JSON \(status 502\)/,
  );
});

test('API error message is normalized from nested response payloads', async () => {
  const h = createHarness({
    response: {
      status: 400,
      ok: false,
      headers: { get: () => 'application/json' },
      json: async () => ({ response: { error: { message: 'Invalid booking' } } }),
    },
  });

  await assert.rejects(h.apiRequest('/data/booking'), /Invalid booking/);
});

test('request omits authorization and nonce headers when runtime values are absent', async () => {
  const h = createHarness({ token: null, nonce: '' });
  await h.apiRequest('/data/booking');

  assert.equal('Authorization' in h.calls[0].options.headers, false);
  assert.equal('X-WP-Nonce' in h.calls[0].options.headers, false);
});
