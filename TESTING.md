# Testing Summary

The final capstone report documented both functional and non-functional testing for the integrated KST Cangar system.

## Test environment

The report records the following evaluation setup:

- Laptop/PC class environment
- Chrome and Firefox as primary browsers
- MySQL through phpMyAdmin in the local environment
- XAMPP / local WordPress environment plus team hosting for deployment work
- Internal testing by the six-person team
- Simulated roles including Admin KST, Operator, and Public user

## Functional scenarios

The documented scenarios covered:

| Area | Example scenario | Expected behavior |
| --- | --- | --- |
| Authentication | Valid email/password | Redirect to dashboard according to role |
| Authentication | Incorrect password | Authentication error shown |
| RBAC | Login as stock operator | Only stock-related access is presented |
| Stock Opname | Missing required item field | Form rejected |
| Stock Opname | Physical stock differs from system stock | Difference calculated |
| Stock Opname | Valid stock-in quantity | Data stored and displayed |
| Stock Opname | Admin validation | Draft status becomes validated |
| Booking | Valid booking input | Booking appears with pending status |
| Booking | Required field omitted | Form rejected |
| Booking | Admin confirmation | Status becomes confirmed |
| Finance | Valid income entry | Stored as draft |
| Finance | Empty/zero amount | Form rejected |
| Finance | Daily/monthly filter | Aggregated totals shown |

## Non-functional evaluation

The report also records evaluation of:

- **Usability** - users were able to operate the system after a short introduction, although some adaptation to the new dashboard was needed.
- **Performance** - standard pages were reported around the sub-2-second range, while graph-heavy dashboard pages could require roughly 4-5 seconds.
- **Basic access control** - admin pages were tested against unauthenticated or cross-role access scenarios.
- **Browser compatibility** - Chrome, Firefox, and Edge were used in manual testing.
- **Ease of operational use** - operator workflows were tested through daily-input simulations.

## Integration testing relevant to my contribution

My individual work log documents end-to-end testing of the following integrated flow before the final demo:

```text
login
  -> dashboard
      -> stock opname
      -> booking / Booklist ATP
  -> REST API integration
  -> role-aware UI behavior
```

This phase included debugging minor frontend and integration issues after backend response structures changed during development.

## Current executable portfolio checks

The historical capstone evidence is primarily manual/report-based. To make the **retained frontend integration code** directly inspectable today without pretending that these tests existed during the original capstone, the portfolio now includes [`tests/api-request.test.mjs`](./tests/api-request.test.mjs).

The suite evaluates the actual curated [`src/theme/assets/js/api.js`](./src/theme/assets/js/api.js) inside an isolated JavaScript VM with fake browser/fetch dependencies. It verifies:

- REST URLs are built from the WordPress-injected runtime base URL;
- bearer token and WordPress nonce headers are attached when available;
- `PUT` and `DELETE` are tunneled through `POST` using `X-HTTP-Method-Override` as implemented by the retained client;
- request bodies remain JSON encoded;
- `401` clears the stored access token and initiates reload behavior;
- non-JSON server responses are rejected before parsing;
- nested API error messages are surfaced consistently; and
- unauthenticated calls do not invent authorization headers.

The tests require only Node's built-in `node:test`, `assert`, and `vm` modules. GitHub Actions runs them on push and pull request via [`.github/workflows/frontend-contracts.yml`](./.github/workflows/frontend-contracts.yml).

> These are **portfolio continuation tests around retained source**, not retroactive evidence that the original team used automated unit tests in 2026.

## Remaining validation gaps

The current automated suite does not reproduce a full WordPress/MySQL installation and therefore does not prove:

- backend REST endpoint correctness;
- database migrations or persistence behavior;
- server-side authentication/RBAC enforcement;
- browser rendering of the complete theme;
- booking-capacity rules;
- production-scale performance;
- penetration-testing results.

Those boundaries remain intentionally separate from the manual functional evaluation documented in the final report.

## What is not claimed

This repository does **not** claim:

- automated unit/integration test coverage existed in the original capstone when the source evidence does not show it,
- production-scale performance testing,
- penetration testing,
- a complete security audit,
- that every documented edge case was fully resolved before project close.

For unresolved or inconsistent items, see [LIMITATIONS.md](LIMITATIONS.md).
