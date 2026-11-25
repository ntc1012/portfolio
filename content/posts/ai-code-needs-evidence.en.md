---
{"slug":"ai-code-needs-evidence","title":"AI-assisted code still needs an evidence trail","description":"Review the contract, test observable outcomes, and distinguish simulated tests from a real integration check.","date":"2026-11-25","tags":["Engineering","AI-assisted development"]}
---
Generated code can be a useful starting point. A plausible explanation of that code is not evidence that it behaves correctly.

## Define what success means

For an account sync, success might mean the expected directory account exists in the correct OU and has the intended status. For publishing, it might mean the remote video's metadata and visibility match the approved version.

Those are stronger contracts than “the function returned” or “the request was queued”. A review should connect each visible success state to an observable outcome.

## Test the boundary, not just the happy path

Useful cases include a repeated request, a missing permission, an unavailable dependency and a response lost after the remote service accepted the operation. The question is not only whether an error is caught, but what the next attempt will do.

Security helpers deserve the same treatment. Calling a TOTP verification function does not automatically add reused-code rejection or attempt throttling. Those properties need their own state and checks; the PyOTP documentation discusses them explicitly.

## Label the evidence honestly

A unit test with a fake API proves behavior under the assumptions of that fake. It does not prove a live service accepts the request. A screenshot proves what was visible at a moment, not necessarily the backend state behind it.

A useful project record connects the version reviewed, automated tests, a small integration check and a reproducible demo. Missing evidence can be named as the next step without inventing a metric or disguising an illustration as a running system.

For concrete examples, see the [IAM analysis](/projects/iam/), the [publishing workflow](/projects/youtube-automation/) and [PyOTP's security guidance](https://pyauth.github.io/pyotp/).
