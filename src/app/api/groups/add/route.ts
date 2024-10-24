import {db} from "@/lib/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {nanoid} from "nanoid";
import {fetchRedis} from "@/helpers/redis";
import {pusherServer} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";
import {getDrawResults} from "@/helpers/functions";


export async function POST (req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', {status: 401});
        }

        // GET LOGGED FRIENDS
        const {data: data}:{data: RawGroupType} = await req.json();
        const convertedLoggedFriends = await Promise.all(
            [session.user.id, ...data.loggedFriends].map(async (friendId) => {
                const rawFriend = await fetchRedis(
                    'get',
                    `user:${friendId}`
                ) as string;
                return JSON.parse(rawFriend);
            })
        ) as User[];

        // CONVERT EXTERNAL FRIENDS TO DATABASE RECORD
        const convertedExternalFriends = data.externalFriends.map((friendName) => {
            return {
                name: friendName,
                id: nanoid(),
                email: '',
            }
        })

        // ADD GROUP
        const groupId = nanoid();
        const groupData: GroupType = {
            externalFriends: convertedExternalFriends,
            loggedFriends: convertedLoggedFriends,
            creatorId: session.user.id,
            name: data.name,
            minBudget: data.minBudget,
            maxBudget: data.maxBudget,
            id: groupId,
            giftDay: data.giftDay,
        }
        await pusherServer.trigger(
            toPusherKey(`user:${session.user.id}:groups`),
            'new-group',
            '',
        )
        await db.set(`group:${groupId}`, groupData);

        // ADD GROUP TO ALL LOGGED FRIENDS
        for (const member of convertedLoggedFriends){
            await db.sadd(`user:${member.id}:groups`, groupId);
        }

        // ADD DRAW RESULTS
        const drawMembers = convertedLoggedFriends.map((member) => {
            return {
                name: member.name,
                id: member.id,
            }
        }).concat(convertedExternalFriends.map((member) => {
            return {
                name: member.name,
                id: member.id,
            }
        }))
        const drawResults = await getDrawResults(drawMembers);
        await db.set(`group:${groupId}:draw-result`, drawResults);

        return new Response('Ok')
    } catch (error) {
        return new Response('some error ADD GROUP', {status: 400})
    } finally {

    }
}