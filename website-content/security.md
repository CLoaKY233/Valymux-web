# Security

## Security First

Valymux is being built with safety as a core product principle.

For us, security is not just compliance language. It is part of the developer experience.

If developers trust the platform with their provider keys, traffic, and logs, then the product has to earn that trust early.

## Current Security Posture

The current architecture already reflects a few strong decisions:

- provider API keys are encrypted at rest
- virtual API keys are stored as hashes, not plaintext
- database permissions scope access to authenticated users
- sensitive configuration values are redacted in debug output
- request validation happens before forwarding to providers
- model capability checks happen before a request is sent upstream
- request logs focus on metadata rather than exposing secrets

## Why This Architecture Helps

The product is designed so credentials and access boundaries are treated as first-class concerns.

That means the control plane knows who can do what, which models are allowed, which provider keys belong to which user, and which requests should be blocked before they ever leave the system.

## Built-In Trust Signals

- clear authentication flow
- per-user provider ownership
- virtual key authorization
- model allowlists per virtual key
- expiry support for virtual keys
- secret redaction in configuration logging
- request-level observability without leaking raw secrets

## Principles We Are Following

### Minimize exposure

Store as little sensitive material as possible in plaintext.

### Validate early

Reject invalid requests before they hit upstream providers.

### Scope access tightly

Ensure users only access their own credentials and data.

### Keep logs useful, not risky

Logs should help diagnose issues without creating a second secrets store.

### Make control explicit

Model access, key access, and provider access should be visible and manageable.

## What Is Coming Next

As the product matures, we expect the security story to expand into:

- rate limiting
- stronger policy controls
- organization and team boundaries
- more audit visibility
- better key rotation workflows
- broader abuse prevention

## Security Message For The Site

We are building Valymux to be the safe way to work across AI providers.

Not just fast.
Not just flexible.
Safe enough to trust with real workloads.
