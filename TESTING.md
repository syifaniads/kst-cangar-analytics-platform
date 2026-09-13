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

## What is not claimed

This repository does **not** claim:

- automated unit/integration test coverage that is not present in the source evidence,
- production-scale performance testing,
- penetration testing,
- a complete security audit,
- that every documented edge case was fully resolved before project close.

For unresolved or inconsistent items, see [LIMITATIONS.md](LIMITATIONS.md).
