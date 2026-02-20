# Logging and Monitoring

## Structured logs

- Backend emits JSON logs with level, message, timestamp, and context.
- Key events logged:
  - request completion
  - auth failures
  - error responses
  - SES message IDs

## Cloud aggregation

- Stream ECS container logs to CloudWatch Logs.
- Separate log groups by service:
  - `/synect/backend`
  - `/synect/frontend`

## Monitoring baseline

- Track health endpoint (`/api/health`) via synthetic checks.
- Set alarms for:
  - high 5xx rates
  - elevated response latency
  - container restart spikes

## Incident debugging

- Use request path/method/status in structured logs to correlate failures quickly.
- Keep stack traces available only in non-production responses.
