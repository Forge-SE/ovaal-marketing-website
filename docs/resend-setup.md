# Beta signup with Resend

The beta form posts to `/api/beta`. The server validates every field and stores the signup as a Resend contact with seven custom properties containing the full name, phone, restaurant, role, restaurant type, location and optional branch count. Secrets stay on the server. A success screen appears only after Resend accepts the contact.

Beta signups are assigned to audience `150ae7b0-d139-4741-b900-5ec8d8326f79`, including contacts that already exist. Resend now calls audiences **Segments**; the integration uses the current Segments API. Override the configured list with the server-only `RESEND_AUDIENCE_ID` environment variable if needed. Setup verifies this list exists before creating contact properties. A signup is not reported as successful if its audience assignment fails.

## Configure

1. Add a full-access `RESEND_API_KEY` to `.env.local`. A sending-only key cannot manage contacts. Never use a `NEXT_PUBLIC_` key or commit the secret.
2. Run `node --env-file=.env.local --experimental-strip-types scripts/setup-resend.mjs` once. This creates missing `beta_*` contact properties without creating contacts or sending messages. Run it for the production Resend account before enabling production submissions.
3. Set the same secret in your hosting environment and restart the local development server after adding it locally.
4. Submit an authorised test signup and verify the contact and every property in Resend. Until that live check passes, provider delivery/storage is unverified.

This integration stores contacts; it does not send notification or welcome emails and does not require a sending domain. New contacts are excluded from marketing broadcasts. Repeated signups update beta details without changing existing subscription preferences. Contact deletion requests can be handled through the Resend dashboard.

The endpoint has a request-size limit, origin checks and a bounded in-memory attempt limit. The attempt limit is per server instance, resets after restarts and is not a distributed production abuse control. Use your hosting provider's rate controls as traffic grows.

The meeting form still previews a request locally; selecting a preferred time does not create a calendar booking or send a meeting request.
