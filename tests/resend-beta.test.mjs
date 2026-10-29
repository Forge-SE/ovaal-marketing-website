import assert from "node:assert/strict";
import test from "node:test";
import { betaAudienceId, ResendError, saveBetaContact } from "../lib/resend-beta.ts";

const signup = { fullName: "Ama Osei Mensah", email: "Ama@Example.com ", phone: "+233240000000", restaurantName: "Ama’s Kitchen", role: "Owner / Founder", restaurantType: "Full-service restaurant", location: "Accra, Greater Accra Region, Ghana", branches: 2 };

test("saves every signup field and excludes new contacts from marketing broadcasts", async () => {
  const calls = [];
  await saveBetaContact("test-key", signup, async (url, options) => {
    calls.push({ url, ...options, payload: options.body ? JSON.parse(options.body) : undefined });
    return calls.length === 1 ? Response.json({}, { status: 404 }) : Response.json({ id: "contact-1" });
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, "https://api.resend.com/contacts");
  assert.equal(calls[1].headers.Authorization, "Bearer test-key");
  assert.equal(calls[1].payload.email, "ama@example.com");
  assert.equal(calls[1].payload.first_name, "Ama");
  assert.equal(calls[1].payload.last_name, "Osei Mensah");
  assert.equal(calls[1].payload.unsubscribed, true);
  assert.deepEqual(calls[1].payload.segments, [{ id: betaAudienceId }]);
  assert.deepEqual(calls[1].payload.properties, { beta_full_name: signup.fullName, beta_phone: signup.phone, beta_restaurant: signup.restaurantName, beta_role: signup.role, beta_restaurant_type: signup.restaurantType, beta_location: signup.location, beta_branches: "2" });
});

test("repeated signups update details without changing subscription preferences", async () => {
  const calls = [];
  await saveBetaContact("test-key", signup, async (url, options) => {
    calls.push({ url, ...options, payload: options.body ? JSON.parse(options.body) : undefined });
    return Response.json({ id: "existing" });
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].method, "PATCH");
  assert.equal(calls[0].url, "https://api.resend.com/contacts/ama%40example.com");
  assert.equal("unsubscribed" in calls[0].payload, false);
  assert.equal(calls[1].url, `https://api.resend.com/contacts/ama%40example.com/segments/${betaAudienceId}`);
});

test("an optional branch count is stored without an invented value", async () => {
  let payload;
  await saveBetaContact("test-key", { ...signup, branches: undefined }, async (_url, options) => {
    if (options.body) payload = JSON.parse(options.body);
    return Response.json({ id: "contact-1" });
  });
  assert.equal(payload.properties.beta_branches, "");
});

test("provider authentication and rate failures are propagated, not treated as duplicates", async () => {
  for (const status of [401, 403, 422, 429, 500]) {
    let calls = 0;
    await assert.rejects(() => saveBetaContact("test-key", signup, async () => { calls++; return Response.json({}, { status }); }), error => error instanceof ResendError && error.status === status);
    assert.equal(calls, 1);
  }
});

test("failed contact updates and network failures cannot report success", async () => {
  let calls = 0;
  await assert.rejects(() => saveBetaContact("test-key", signup, async () => Response.json({}, { status: ++calls === 1 ? 404 : 503 })));
  await assert.rejects(() => saveBetaContact("test-key", signup, async () => { throw new Error("offline"); }));
});

test("concurrent create conflicts retry the update without changing preferences", async () => {
  const calls = [];
  await saveBetaContact("test-key", signup, async (url, options) => {
    calls.push({ url, ...options, payload: options.body ? JSON.parse(options.body) : undefined });
    return Response.json({}, { status: [404, 409, 200, 200][calls.length - 1] });
  });
  assert.deepEqual(calls.map(call => call.method), ["PATCH", "POST", "PATCH", "POST"]);
  assert.equal("unsubscribed" in calls[2].payload, false);
});

test("failed audience assignment cannot report signup success", async () => {
  let calls = 0;
  await assert.rejects(() => saveBetaContact("test-key", signup, async () => Response.json({}, { status: ++calls === 1 ? 200 : 404 })), error => error instanceof ResendError && error.status === 404);
  assert.equal(calls, 2);
});
