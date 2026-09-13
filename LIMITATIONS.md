# Known Limitations

This document preserves limitations from the capstone evidence instead of presenting the project as fully production-ready.

## 1. RBAC presentation issue

The final report records that a validation action could still appear for an operator role even though validation should be restricted to an admin role.

**Impact:** the UI could expose an action that the role should not normally use.

**Recommended follow-up:** enforce authorization server-side for every privileged operation and independently hide/disable unauthorized controls in the frontend.

## 2. Dashboard mobile responsiveness

Mobile optimization was still listed as ongoing at project close.

**Impact:** the desktop dashboard experience was stronger than the mobile experience.

**Recommended follow-up:** test KPI grids, tables, charts, and navigation at common mobile breakpoints and redesign dense tables for smaller screens.

## 3. Dashboard performance

The report notes that ordinary pages responded faster than graph-heavy dashboard views, with dashboard loading sometimes reaching roughly 4-5 seconds during testing.

**Potential causes:** multiple API requests, chart rendering, query cost, payload size, or non-optimized asset loading.

**Recommended follow-up:** measure request timings, combine summary queries where appropriate, add caching, reduce payload size, and lazy-load non-critical visualizations.

## 4. Booking-capacity status is inconsistent in team documentation

One part of the final report lists automatic full-slot booking validation as unfinished, while a backend development log states that capacity validation was implemented server-side and client-side.

Because the available evidence is inconsistent, this portfolio does **not** claim the end-to-end capacity check as fully verified in the final integrated product.

## 5. Testing depth

The available evidence primarily documents manual functional testing, UAT-style simulation, and browser checks.

It does not establish:

- comprehensive automated test coverage,
- load testing,
- security penetration testing,
- legacy-browser support,
- long-running production reliability testing.

## 6. Portfolio reconstruction scope

This repository is not intended to be a drop-in standalone deployment of the entire team system. The canonical implementation remains in the original collaborative repository, while this repository focuses on contribution evidence and engineering context.
