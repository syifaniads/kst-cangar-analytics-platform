# Project Overview

## Background

KST Cangar Universitas Brawijaya had operational records distributed across separate/manual workflows. This made it harder to monitor inventory, facility reservations, and financial activity from one place and reduced the speed of data-driven decision making.

The capstone team responded by developing the **Cangar Edu-Agrotourism Analytics Platform**, a web-based information system that centralizes operational data and exposes monitoring through an admin dashboard.

## Users and stakeholders

The documented roles included:

- Super Admin / Administrator
- Admin KST
- Stock Operator
- Booking Operator
- Finance Operator
- Management
- Public / Visitor

## Main system modules

### Public landing page

Public information about KST Cangar, facilities, location, FAQ, and external contact/navigation links.

### Authentication & RBAC

Email/password-based authentication and role-oriented access to operational menus.

### Stock Opname

Weekly stock management covering opening stock, incoming goods, outgoing goods, return quantities, physical stock, and stock differences.

### Booking / Booklist ATP

Reservation management for facility/services, including booking status and operational filtering.

### Finance

Income/expense recording and periodic recap views.

### Admin dashboard

A consolidated operational overview combining inventory, booking, and transaction-oriented information.

## Project outcome

The final report describes the system as ready for demonstration, with core workflows implemented and tested. At the same time, the team explicitly recorded follow-up work for areas such as mobile responsiveness, dashboard performance, an RBAC presentation issue, and booking-capacity validation status.

That combination is important for this portfolio: the project reached an integrated demo stage, but it should not be represented as a fully hardened production platform.

## My engineering focus

My work sat primarily at the boundary between the user interface and the backend API:

```text
Operational requirement
        ↓
Dashboard / module interface
        ↓
JavaScript state + validation
        ↓
REST request / response handling
        ↓
WordPress backend
        ↓
Rendered operational data
```

This involved both implementation and integration debugging, especially as API response contracts changed during development.

## Original collaborative source

https://github.com/gilanghfizh/kstcangar-wp
