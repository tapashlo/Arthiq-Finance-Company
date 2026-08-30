import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext adapter config for Cloudflare Workers.
 *
 * Committed deliberately: without it `wrangler deploy` runs `@opennextjs/
 * cloudflare migrate` on every CI build, in a non-interactive shell where it
 * auto-answers the prompts and generates a config from scratch. That is both
 * slow (a ~285-package install mid-deploy) and non-deterministic — it is how
 * the worker name and the self-reference binding drifted apart.
 *
 * No cache configured: every route on this site is statically prerendered, so
 * there is no ISR to populate. Add an incremental cache here if that changes.
 */
export default defineCloudflareConfig();
