# Frontend & REST API Integration

## Integration responsibility

A major part of my contribution was connecting the admin-facing frontend to the WordPress REST backend so dashboard, Stock Opname, and Booklist ATP views could render dynamic operational data.

The original collaborative code uses a shared API layer and feature-specific scripts.

Relevant original paths include:

```text
wordpress/wp-content/themes/kstcangar-dashboard/
├── functions.php
├── page-dashboard.php
├── page-stok-opname.php
├── page-booklist-atp.php
├── page-login.php
└── assets/
    └── js/
        ├── api.js
        ├── dashboard.js
        ├── stok.js
        ├── booking.js
        └── login-helper.js
```

## Shared API pattern

The theme registers a REST base URL and exposes it to JavaScript. Feature scripts then use a shared API client rather than hard-coding request logic independently in every page.

Conceptual flow:

```js
featurePage()
  -> apiRequest(endpoint)
  -> WordPress REST endpoint
  -> normalized response
  -> update DOM / chart / table
```

This matters because it keeps request concerns separate from feature rendering.

## Dashboard integration

The dashboard aggregates data into a small number of user-facing views:

- item / stock summary,
- booking summary,
- revenue-oriented summary,
- stock chart,
- booking/revenue trend chart,
- recent operational activity.

The project used Chart.js for dashboard visualization.

## Stock Opname integration

The frontend includes inputs and summaries for:

- starting stock,
- incoming goods,
- outgoing goods,
- returns,
- physical stock,
- calculated differences,
- weekly/monthly filtering.

During integration, frontend parsing had to follow the backend response structure and was revised when the API contract changed.

## Booking / Booklist ATP integration

The booking interface presents operational reservation data such as:

- customer / visitor information,
- check-in and check-out,
- contact,
- service/unit type,
- price/payment-related status,
- additional needs,
- actions/status updates.

## Authentication and role-aware behavior

Protected dashboard pages perform authentication checks before rendering. Frontend behavior also adapts to user roles so operators and admins do not see the exact same controls.

One remaining issue recorded in the final report was that a validation control could still be visible for an operator role. That is documented in [../LIMITATIONS.md](../LIMITATIONS.md) rather than hidden from the portfolio.

## Integration challenge

My individual project log notes that backend response structures changed several times during development. The frontend therefore needed repeated updates to:

- parsing,
- field mapping,
- error handling,
- dashboard synchronization,
- module behavior.

The final phase included end-to-end checks across login, dashboard, stock, and booking before the project demonstration.

## Verified commit

A representative integration commit is:

[`4e1bf72` - feat: connect dashboard, stock opname and booklist to backend](https://github.com/gilanghfizh/kstcangar-wp/commit/4e1bf72e4d4450e81d79d5d709aebfecc083bc89)

That commit provides direct evidence of integration changes across the dashboard theme and JavaScript modules.
