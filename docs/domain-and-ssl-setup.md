# Domain and SSL Setup (2.42)

## Domain mapping

- Create hosted zone in Route 53.
- Point DNS records to load balancer endpoints:
  - `api.<domain>` -> backend ALB
  - `app.<domain>` -> frontend ALB

## TLS certificates

- Request certificates in AWS Certificate Manager (ACM).
- Validate domain ownership via DNS records.
- Attach ACM certificates to HTTPS listeners on ALB.

## HTTPS enforcement

- Redirect HTTP (80) to HTTPS (443) at ALB level.
- Keep backend `FORCE_HTTPS=true` in production as defense-in-depth.
