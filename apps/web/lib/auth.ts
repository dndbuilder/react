import { Account, AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { BASE_URL } from "./constants";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          return {
            id: data.id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            image: data.image,
            token: data.token,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account?: Account | null }) {
      // Only process for OAuth providers
      if (account && account.provider && account.provider !== "credentials") {
        try {
          // Send social login data to API
          const response = await fetch(`${BASE_URL}/auth/social-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              provider: account.provider,
              email: user.email,
              name: user.name,
            }),
          });

          console.log("Social login response:", response);

          if (response.ok) {
            const data = await response.json();
            // Store the API token in the user object to be used in the jwt callback
            user.token = data.token;
            return true;
          }

          return false;
        } catch (error) {
          console.error("Error during social login API call:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT & { accessToken?: string } }) {
      if (token) {
        if (session.user) {
          session.user = {
            id: token.id,
            name: token.name || session.user.name || "",
            email: token.email || session.user.email || "",
          };
        }

        // Make sure to set the accessToken on the session
        if (token.accessToken) {
          session.accessToken = token.accessToken;
        }
      }
      return session;
    },
  },
};

export async function getUserProfile(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    // Validate input
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Missing required fields");
    }

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    const data = await response.json();

    return {
      id: data.id,
      name: `${firstName} ${lastName}`,
      email,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
