import {NextAuthOptions} from "next-auth";
import {UpstashRedisAdapter} from "@next-auth/upstash-redis-adapter";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'
import {db} from "@/lib/db";
import {fetchRedis} from "@/helpers/redis";


function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }
    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return {clientId, clientSecret};
}


export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            // poprawność autoryzacji sprawdzam w authorization\route ponieważ funkcja signIn z opcją
            // redirect: true nie zwraca błędu do formularza. Zmiana na redirect: false blokuje
            // router.push() i konieczne jest odświeżenie strony ręczne
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }
                const userId = await fetchRedis(
                    'get',
                    `user:email:${credentials.email}`
                )  as string | null;

                const dbUser = await fetchRedis(
                    'get',
                    `user:${userId}`
                ) as string;

                return JSON.parse(dbUser) as UserWithPassword;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            const dbUserResult = await fetchRedis(
                'get',
                `user:${token.id}`
            ) as string | null

            if (!dbUserResult) {
                token.id = user!.id;
                return token;
            }

            const dbUser = JSON.parse(dbUserResult) as User;

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        },
        redirect () {
            return '/dashboard'
        },
    },
}