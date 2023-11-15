
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {fetchRedis} from "@/helpers/redis";
import {db} from "@/lib/db";


export async function POST (req: Request) {
    try {
        const {emailToAdd, friendName, groupId} = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', {status: 401});
        }
        const rawOutdatedData = await fetchRedis(
            'get',
            `group:${groupId}`
        ) as string;
        const outdatedData:GroupType  = JSON.parse(rawOutdatedData);
        const updatedExternalFriendsList = outdatedData.externalFriends.map((friend) => {
            if (friend.name === friendName){
                return {
                    ...friend,
                    email: emailToAdd,
                }
            }
            return friend;
        })
        const currentData: GroupType = {
            ...outdatedData,
            externalFriends: updatedExternalFriendsList,
        }

        await db.set(`group:${groupId}`, currentData);
        console.log(`adres użytkownika: ${friendName}, został dodany jako: ${emailToAdd}`)


        return new Response('OK');
    } catch (error) {
        return new Response('some error UPDATE EMAIL', {status: 400})
    }
}