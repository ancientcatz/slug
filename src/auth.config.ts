import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

import { env } from "./env.mjs";

export default {
  providers: [
    Github({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    {
      id: "passkey",
      name: "Passkey",
      type: "oidc",
      issuer: env.OIDC_ISSUER,
      wellKnown: `{env.OIDC_ISSUER}/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid profile email" } },
      checks: ["pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
      clientId: env.OIDC_CLIENT_ID,
      clientSecret: env.OIDC_CLIENT_SECRET,
    }
  ],
} satisfies NextAuthConfig;
