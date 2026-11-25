# IAM Policy

A small, dependency-free policy evaluator extracted from Nguyen Tien Cuong's browser IAM sandbox. It demonstrates role-based permissions with ownership and team scopes, explicit deny reasons, and separation of duties.

This is newly written educational code. It contains no RedOne Media source, Active Directory credentials, network calls or personal data. It does not reproduce the policy of the Flask/AD project.

```js
import { authorize } from './src/index.mjs';

authorize(
  { id: 'demo-manager', role: 'manager', team: 'engineering' },
  'leave:approve',
  { type: 'leave', ownerId: 'demo-colleague', team: 'engineering' }
);
// { allowed: true, reason: 'team_scope' }
```

| Role | Profile access | Approve leave | Manage accounts / assign roles |
| --- | --- | --- | --- |
| Employee | Own profile | Denied | Denied |
| Manager | Own profile and same team | Same team, excluding self | Denied |
| Admin | Any valid profile | Any valid request, excluding self | Allowed |

Unknown roles, actions, resource types and malformed identities are denied. Missing team information never grants team access. Decisions are pure: inputs are not mutated, and there is no storage or shared mutable state.

Run tests with `npm test` in this directory, or run the portfolio's root test suite. To extract a separate repository, copy this folder without its parent `.git` directory, keep the MIT license, and add your own repository metadata.

Browser policies illustrate behavior; real applications must enforce authorization on the server using a trusted identity. This evaluator is not an authentication system or a replacement for AD permissions.
