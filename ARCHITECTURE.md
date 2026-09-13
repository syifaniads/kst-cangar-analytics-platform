# Architecture

## System view

The capstone used WordPress as the application platform, with a custom operational dashboard and REST-based data exchange between the frontend and backend modules.

```mermaid
flowchart TB
    subgraph Users
      A[Admin KST]
      O[Operator]
      M[Management]
    end

    subgraph Frontend
      UI[Custom WordPress Dashboard Theme]
      AUTH[Authentication / role-aware interface]
      CHART[Chart.js dashboard visualizations]
      STOCKUI[Stock Opname UI]
      BOOKUI[Booklist ATP UI]
    end

    subgraph Integration
      CLIENT[Shared JavaScript API client]
      REST[WordPress REST API]
    end

    subgraph Backend
      LOGIC[Backoffice business logic]
      STOCK[Stock module]
      BOOK[Booking module]
      FIN[Finance module]
      RBAC[Roles & permissions]
    end

    DB[(MySQL)]

    A --> UI
    O --> UI
    M --> UI

    UI --> AUTH
    UI --> CHART
    UI --> STOCKUI
    UI --> BOOKUI

    CHART --> CLIENT
    STOCKUI --> CLIENT
    BOOKUI --> CLIENT
    AUTH --> CLIENT

    CLIENT --> REST
    REST --> LOGIC
    LOGIC --> STOCK
    LOGIC --> BOOK
    LOGIC --> FIN
    LOGIC --> RBAC
    STOCK --> DB
    BOOK --> DB
    FIN --> DB
    RBAC --> DB
```

## Frontend integration pattern

The custom theme registered shared frontend assets and configured a REST base URL for JavaScript. A common API layer was then reused by the dashboard, booking, and stock scripts.

Conceptually:

```text
WordPress page template
        |
        v
feature-specific JavaScript
        |
        v
shared API client
        |
        v
/wp-json/kstcangar/v1/...
        |
        v
backend module + MySQL
```

This separation made it possible for the dashboard to render server-backed data while keeping feature-specific UI logic in independent scripts.

## Authentication and access control

The system combined two layers:

1. **Server-side access checks** before rendering protected WordPress pages.
2. **Role-aware frontend presentation**, where available navigation/actions differed by the authenticated user's role.

The capstone report states that login redirection and role-specific menu access were tested. It also records one remaining RBAC presentation bug at project close: a validation action could still appear for an operator role even though that action should be admin-only.

## Dashboard data flow

```mermaid
sequenceDiagram
    participant U as Authenticated User
    participant P as Dashboard Page
    participant JS as Dashboard JavaScript
    participant API as REST API
    participant DB as MySQL

    U->>P: Open dashboard
    P->>JS: Load dashboard assets
    JS->>API: Request summary / operational data
    API->>DB: Query stock, booking, finance data
    DB-->>API: Results
    API-->>JS: Structured response
    JS-->>P: Update KPI cards, tables, charts
```

## Portfolio scope

This repository does not copy the entire WordPress installation. WordPress core and unrelated team files are intentionally omitted. The original collaborative source remains the canonical source repository:

https://github.com/gilanghfizh/kstcangar-wp

See [source-reference/README.md](source-reference/README.md) for direct paths to the implementation areas most relevant to this case study.
