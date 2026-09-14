# Original Source Reference

The canonical collaborative implementation remains in:

https://github.com/gilanghfizh/kstcangar-wp

This portfolio repository keeps direct links to the original team history while also including a **curated, sanitized subset** of frontend/theme integration code under [`../src/`](../src/).

## Dashboard theme

- [Theme root](https://github.com/gilanghfizh/kstcangar-wp/tree/main/wordpress/wp-content/themes/kstcangar-dashboard)
- [functions.php](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/functions.php)
- [page-dashboard.php](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/page-dashboard.php)
- [page-stok-opname.php](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/page-stok-opname.php)
- [page-booklist-atp.php](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/page-booklist-atp.php)
- [page-login.php](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/page-login.php)

## Frontend integration scripts

- [api.js](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/assets/js/api.js)
- [dashboard.js](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/assets/js/dashboard.js)
- [stok.js](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/assets/js/stok.js)
- [booking.js](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/themes/kstcangar-dashboard/assets/js/booking.js)

The original authentication helper is intentionally **not directly reproduced in this portfolio** because it contained environment-specific hard-coded credentials in client-side code. This repository uses a sanitized [`login-helper.example.js`](../src/theme/assets/js/login-helper.example.js) instead.

## Backend / API context

The backend/API was primarily another team member's responsibility, but it is useful context for understanding the frontend integration:

- [Custom backoffice plugin](https://github.com/gilanghfizh/kstcangar-wp/tree/main/wordpress/wp-content/plugins/kstcangar-backoffice)
- [API class](https://github.com/gilanghfizh/kstcangar-wp/blob/main/wordpress/wp-content/plugins/kstcangar-backoffice/includes/class-api.php)

## Contribution commits

- [Update dashboard frontend](https://github.com/gilanghfizh/kstcangar-wp/commit/9c03bd144337e43ace2a9289a6f58aec4cfb4c9a)
- [final admin dashboard](https://github.com/gilanghfizh/kstcangar-wp/commit/2ce78e02ae394d394e88e8146fad0ea8e3c9fba9)
- [fix: admin panel](https://github.com/gilanghfizh/kstcangar-wp/commit/82cff1751e27339788bf57e4cc8f9d528d77abed)
- [connect dashboard, stock opname and booklist to backend](https://github.com/gilanghfizh/kstcangar-wp/commit/4e1bf72e4d4450e81d79d5d709aebfecc083bc89)

## Why not copy the entire repository?

The original repository includes WordPress core files, default plugins/themes, uploads, and team-wide implementation. Copying all of it would obscure individual contribution and duplicate unrelated code. The portfolio repository therefore keeps only the parts useful for technical review and preserves canonical attribution through the original links and commit history.
