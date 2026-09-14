# Curated Source Snapshot

This directory contains a **portfolio-oriented, sanitized subset** of frontend/theme code from the original collaborative KST Cangar capstone repository.

It is intentionally not a full WordPress installation. WordPress core, default plugins/themes, uploads, generated files, database dumps, and environment-specific configuration are excluded.

## Included here

- `theme/assets/js/api.js` - shared REST API request helper
- `theme/assets/js/dashboard.js` - dashboard data loading and Chart.js visualization flow
- `theme/assets/js/stok.js` - Stock Opname frontend state, filtering, CRUD integration, and calculations
- `theme/assets/js/booking.js` - booking list, status summaries, CRUD integration, and payload mapping
- `theme/assets/js/login-helper.example.js` - sanitized authentication example
- `theme/functions.php` - WordPress asset wiring and REST configuration injection

## Attribution

The overall capstone was developed by a six-person team. This repository highlights Syifani Adillah Salsabila's documented frontend/dashboard/integration contribution while preserving attribution to the original collaborative work.

Original team repository: https://github.com/gilanghfizh/kstcangar-wp

See [`../CONTRIBUTIONS.md`](../CONTRIBUTIONS.md) for commit-level contribution evidence.

## Security note

A file in the original collaborative repository contained hard-coded environment authentication values. Those values are **not copied here**. The portfolio version replaces that pattern with `login-helper.example.js`, which accepts runtime credentials and stores only the returned access token.

Do not commit real credentials, tokens, database dumps, production URLs, or private configuration to this repository.
