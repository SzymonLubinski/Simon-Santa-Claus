import {nanoid} from "nanoid";
import {RegisterFormTypes} from "@/types/other-types";
import {fetchRedis} from "@/helpers/redis";
import {db} from "@/lib/db";


export async function POST (req: Request) {
    try {

        const {data: data}: {data: RegisterFormTypes} = await req.json();
        console.log('register', data)

        const existingUser = await fetchRedis(
            'get',
            `user:email:${data.email}`,
        );
        if (existingUser) {
            return new Response('is existing user!', {status: 400});
        }
        const user: UserWithPassword = {
            name: data.username,
            email: data.email,
            image: '',
            id: nanoid(),
            password: data.password,
        }
        await db.set(`user:${user.id}`, user);
        await db.set(`user:email:${user.email}`, user.id);
        console.log('dodano użytkownika', user.name)
        return new Response('Ok')
    } catch (error) {
        return new Response('REGISTER: some error', {status: 400})
    } finally {

    }
}