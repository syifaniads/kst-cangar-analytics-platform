# Security & Sanitization

This repository is a public portfolio case study. It intentionally excludes production credentials, private tokens, database dumps, environment-specific secrets, and sensitive operational data.

## Sanitization rules

Do not commit:

- passwords or API tokens,
- WordPress salts or `wp-config.php`,
- `.env` files,
- private database exports,
- personal customer/visitor data,
- production-only URLs or internal infrastructure details,
- generated uploads that may contain personal information.

The authentication example under `src/theme/assets/js/login-helper.example.js` is intentionally sanitized. Real credentials must be supplied at runtime through a secure login flow and must never be embedded in client-side source code.

## Retained frontend trust boundary

The curated frontend code preserves behavior from the collaborative capstone so it can be inspected honestly. That also means several client-side patterns should **not** be interpreted as production-hardening guidance.

### Bearer token storage

`api.js` reads `kst_access_token` from browser `localStorage` and places it in the `Authorization` header. This is inspectable evidence of the original frontend/API integration, but browser storage is accessible to JavaScript executing in the page. A production security design should evaluate HttpOnly/Secure cookie-based sessions or another architecture that reduces token exposure to injected scripts.

### DOM rendering / XSS

Several retained module renderers construct HTML strings with data originating from API responses and assign them using `innerHTML`. For example, booking fields such as customer name, contact information, unit, invoice, and additional needs are interpolated into table markup.

Because the curated subset does not show a complete server-side output-encoding guarantee or a client-side sanitizer, this repository does **not** claim XSS-safe rendering for arbitrary untrusted data. A production implementation should prefer text-node/`textContent` rendering for untrusted values or apply context-appropriate, reviewed sanitization.

### RBAC presentation vs authorization

Role-aware navigation and hidden controls improve user experience but are not sufficient authorization. Server-side REST endpoints must independently verify the authenticated identity and role for every privileged operation. The final report itself recorded an RBAC UI inconsistency for an operator role, so this portfolio intentionally distinguishes UI presentation from authoritative access control.

### WordPress nonce

The retained helper sends a WordPress REST nonce when one is injected through `kstConfig`. A nonce is useful for request validation in the relevant WordPress authentication context, but it is not a replacement for authorization checks and should not be treated as a general-purpose secret.

## Current portfolio validation

[`tests/api-request.test.mjs`](./tests/api-request.test.mjs) exercises the retained API helper's request construction, method override behavior, 401 cleanup, JSON response requirement, and error normalization. This improves regression visibility for the curated source but is **not** a penetration test or a full WordPress security test.

## Scope

This repository is not intended to be deployed as-is. It is a curated engineering case study derived from a university capstone project and is provided for portfolio review and technical discussion.
