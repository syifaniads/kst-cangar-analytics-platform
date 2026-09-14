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

## Scope

This repository is not intended to be deployed as-is. It is a curated engineering case study derived from a university capstone project and is provided for portfolio review and technical discussion.
