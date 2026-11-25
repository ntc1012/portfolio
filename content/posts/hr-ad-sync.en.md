---
{"slug":"hr-ad-sync","title":"A completed sync is not always a correct sync","description":"Account lifecycle, partial failures and the difference between a success message and a verified directory state.","date":"2026-11-25","tags":["IAM","Active Directory"]}
---
An HR database and a directory describe the same employee in different ways. A useful synchronization process must reconcile those representations, not merely finish a loop.

## Start with a lifecycle

In the current IAM project, an active HR record maps to an LDAP account creation attempt. An inactive record maps to account deactivation. The email prefix supplies the account name; the employee name and department determine the distinguished name and OU.

That leaves important questions: what happens when someone returns, changes their name, or moves to another department? The reviewed routine skips existing accounts. Those transitions therefore need explicit reconciliation logic; they are not solved by calling “create” again.

## Treat outcomes as data

A helper can log an LDAP failure and return normally. Its caller may then increment a success counter or show a completion message. Both behaviors can be technically consistent with the control flow while misleading the operator.

A better contract returns a result for each record: `created`, `disabled`, `unchanged`, or `failed`, with an error category. The final summary should distinguish full success from partial completion. Re-running the same snapshot should not create extra accounts or lose the information needed to recover.

## Observe the destination

For a demo, a success banner is only the start. Show the actual directory account and its disabled state, then connect those changes to the HR record and audit events. Use fictitious employees in a dedicated lab.

Audit events explain who initiated an operation and when. They complement destination checks; a log saying “completed” is not independent proof that every LDAP operation worked.

See the [IAM project story](/projects/iam/) for the implementation and its current limits. Source: [the reviewed synchronization module](https://github.com/ntc1012/DOAN_CYBERSEC/blob/c544f304794a1a475e6ace99f144b2637f52e1b1/sync_hr_ad.py).
