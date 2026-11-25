---
{"slug":"quota-is-a-state","title":"Quota exhaustion deserves its own state","description":"Why a daily API limit, a rate limit and an uncertain upload result should not share one retry loop.","date":"2026-11-25","tags":["APIs","Automation"]}
---
A background job needs more than a generic “try again” button. The reason for failure determines whether retrying now is useful, wasteful or likely to create a duplicate.

## Separate the signals

In the reviewed YouTube publishing implementation, `quotaExceeded` and `dailyLimitExceeded` put the job into `quota_wait`. The cooldown is persisted by quota scope and API bucket, so other jobs do not immediately repeat the same requests.

Short-lived throttling follows a different path: bounded exponential backoff, respecting a valid `Retry-After`. Waiting for daily quota does not consume the transient-error retry budget or occupy a worker lease overnight.

Google documents daily resets at midnight Pacific Time. The implementation calculates that boundary using `America/Los_Angeles`, stores the time in UTC, and adds a small random delay. The application's daily upload limit per channel is a separate business rule, not the Cloud project's quota.

## Keep the identity of the operation

After a lost upload response, creating a new video is not a safe default. The existing resumable session may already have accepted the bytes. Persisting the session before sending media lets the worker ask what happened and continue the same operation.

If the result still cannot be established, the job moves to reconciliation. This trades immediate progress for a clearer outcome and fewer accidental duplicates.

## Verify before reporting success

`queued` means accepted for processing. It does not mean published. The worker reads the remote resource back and compares it with the approved metadata and visibility before reporting the final state.

The current refactor uses official APIs rather than automating YouTube Studio. Read the [project story](/projects/youtube-automation/) and the official guides to [quota](https://developers.google.com/youtube/data/determine_quota_cost) and [resumable uploads](https://developers.google.com/youtube/data/guides/using_resumable_upload_protocol).
