# Debugging Retrospective and Problem-Solving Strategy

This retrospective captures recurring technical issues during Synect development and how they were resolved.

## Challenge: authentication edge cases

- Symptom: protected routes intermittently rejected valid sessions.
- Root causes:
  - inconsistent JWT claims across environments
  - missing role checks in selected route combinations
- Resolution strategy:
  - standardized issuer and audience validation
  - tightened guard and RBAC path coverage in backend tests
  - verified auth flow with signup/login/me/admin integration scenarios
- Lesson learned: treat auth configuration as contract data, not incidental runtime config.

## Challenge: environment mismatches

- Symptom: local runs passed while CI or deployment checks failed.
- Root causes:
  - missing env vars in cloud contexts
  - differences between local service availability and CI runtime
- Resolution strategy:
  - expanded `.env.example` and required variable checks
  - documented cloud runtime expectations and setup steps
  - added CI pipeline gates for lint, build, and tests
- Lesson learned: make environment assumptions explicit in docs and runtime validation.

## Challenge: cache behavior and stale reads

- Symptom: mentor listing sometimes returned stale profile data.
- Root causes:
  - cache key lifecycle not aligned with update paths
- Resolution strategy:
  - applied cache-aside with targeted invalidation on profile updates
  - kept database as source of truth and cache as performance layer only
- Lesson learned: cache correctness rules must be documented near endpoint behavior.

## Challenge: deployment verification confidence

- Symptom: image push success did not guarantee service health after rollout.
- Root causes:
  - no automated post-deploy health confirmation
- Resolution strategy:
  - added release workflow with health check retries
  - configured rollback action to last stable ECS task definition on failure
- Lesson learned: deployment automation should include both release and recovery paths.

## Team debugging approach that worked

- Reproduce first, then instrument logs and narrow blast radius.
- Validate assumptions with tests before and after fixes.
- Prefer small, reversible changes with focused PRs.
- Convert each resolved issue into durable docs or CI checks.
