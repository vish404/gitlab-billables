import NextAuth from "next-auth";
import GitLab from "next-auth/providers/gitlab";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitLab({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
      authorization: {
        url: process.env.GITLAB_URL + "/oauth/authorize",
        params: { scope: "read_user api read_api" },
      },
      token: process.env.GITLAB_URL + "/oauth/token",
      userinfo: process.env.GITLAB_URL + "/api/v4/user",

    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.profile = profile;
        token.accessToken = account.access_token;
        const expiresDate = new Date(account.expires);
        token.exp = Math.floor(expiresDate.getTime() / 1000) - 300;
      }
      return token;
    },
    async session({ session, token }) {
      session.user= token.profile;
      session.accessToken = token.accessToken;
      session.expires = new Date(token.exp * 1000).toISOString();

      return session;
    },
  },
});
