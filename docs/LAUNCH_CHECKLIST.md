# Phase 4 launch checklist

- [ ] **Security**
  - [ ] Paymob webhook: `PAYMOB_HMAC_SECRET` set; HMAC verified in `/api/webhooks/paymob`
  - [ ] Bosta webhook: `BOSTA_WEBHOOK_SECRET` set if Bosta sends signature
  - [ ] API rate limiting: search and other public APIs within limits
  - [ ] CSRF/XSS: forms and user input sanitized; no raw HTML injection

- [ ] **Content**
  - [ ] Products in Medusa: 6 images per product (shot types), model_stats, wash_test_verified
  - [ ] Artists and collections in Sanity
  - [ ] Policies (exchange, shipping, privacy) published in Arabic

- [ ] **Infrastructure**
  - [ ] Production domain (horo.eg), SSL, Cloudflare DNS/WAF
  - [ ] `NEXT_PUBLIC_SITE_URL` set for production
  - [ ] Error tracking (e.g. Sentry): DSN in env, errors captured
  - [ ] Uptime: monitor `/api/health` (e.g. UptimeRobot, Better Stack)

- [ ] **Load test**
  - [ ] Run load test (~500 concurrent users) against staging
  - [ ] Fix bottlenecks; re-check LCP/TTFB/CLS (Section 12 targets)

- [ ] **Soft launch**
  - [ ] Limited traffic; collect feedback
  - [ ] Critical fixes applied before full launch
