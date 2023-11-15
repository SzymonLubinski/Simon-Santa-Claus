import {FC} from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {notFound} from "next/navigation";
import {fetchRedis} from "@/helpers/redis";
import FriendRequests from "@/components/Dashboard/Friends/FriendRequests";


const Page: FC = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();
    const incomingSenderIds = await fetchRedis(
        'smembers',
        `user:${session.user.id}:incoming_friend_requests`
    ) as string[];

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async (senderId) => {
            const senderRaw = await fetchRedis(
                'get',
                `user:${senderId}`
            ) as string;

            const sender = JSON.parse(senderRaw) as User;
            return {
                senderId,
                senderEmail: sender.email,
            }
        })
    )

    return (
        <>
            <FriendRequests IncomingFriendRequests={incomingFriendRequests}
                            sessionId={session.user.id}
            />
        </>
    )
}

export default Page;