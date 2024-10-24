
import {LoginFormTypes} from "@/types/other-types";
import {fetchRedis} from "@/helpers/redis";


// poprawność autoryzacji sprawdzam w authorization\route ponieważ funkcja signIn z opcją
// redirect: true nie zwraca błędu do formularza. Zmiana na redirect: false blokuje
// router.push() i konieczne jest odświeżenie strony ręczne
export async function POST(req: Request) {
    try {
        const {credentials: credentials}: { credentials: LoginFormTypes } = await req.json();
        if (!credentials.email || !credentials.password) {
            return new Response('Please enter an email and password!', {status: 400});
        }
        const userId = await fetchRedis(
            'get',
            `user:email:${credentials.email}`
        ) as string | null;

        if (!userId) {
            return new Response('No user found!', {status: 400});
        }
        const dbUser = await fetchRedis(
            'get',
            `user:${userId}`
        ) as string;

        const user = JSON.parse(dbUser) as UserWithPassword;
        if (!user.password) {
            return new Response('Google client!', {status: 400});
        }
        const passwordMatch = credentials.password === user.password;
        if (!passwordMatch) {
            return new Response('Wrong password!', {status: 400});
        }

        return new Response('Ok')

    } catch (error) {
        console.log('AUTHORIZATION error: ', error)
        return new Response(`AUTHORIZATION: some error`, {status: 400})
    } finally {

    }
}