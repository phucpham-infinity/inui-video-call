import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "437711522760-j9usah9n6e3ceh47td6peo26impbib92.apps.googleusercontent.com",
      clientSecret: "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",
      profile: (profile) => {
        console.log("🚀 ~ file: options.ts:10 ~ profile:", profile);
        let userRole = "user";
        if (profile.email === "phucpham.infinity@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          image: profile?.picture,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user?.role || "user";
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
