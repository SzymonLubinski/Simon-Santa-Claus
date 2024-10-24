import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {fetchRedis} from "@/helpers/redis";
import {db} from "@/lib/db";


export async function POST (req: Request) {
    try {
        const {recipientId, groupId} = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', {status: 401});
        }

        // GET OLD DATA
        const rawOutdatedData = await fetchRedis(
            'get',
            `group:${groupId}:draw-result`
        ) as string;

        // UPDATE DATA
        const outdatedData:DrawResult[] = JSON.parse(rawOutdatedData);
        const [current] = outdatedData.filter((el) => el.recipient.id === recipientId);
        const restArray = outdatedData.filter((el) => el.recipient.id !== recipientId);
        const updatedDrawResult: DrawResult[] = [
            {
                giftPictureNum: current.giftPictureNum,
                recipient: current.recipient,
                donor: current.donor,
                alreadyGiven: true
            },
            ...restArray
        ]

        // SET NEW DATA
        await db.set(`group:${groupId}:draw-result`, updatedDrawResult);
        console.log(`lista prezentów została zaaktualizowana o id: ${recipientId}`);

        return new Response('OK');
    } catch (error) {
        return new Response('some error Give Gift', {status: 400})
    }
}

