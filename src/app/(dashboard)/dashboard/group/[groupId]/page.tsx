

import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {notFound} from "next/navigation";
import {fetchRedis} from "@/helpers/redis";
import Menu from "@/components/Groups/Menu";


interface PageProps {
    params: {
        groupId: string
    }
}

const Page = async ({params}: PageProps) => {
    const {groupId} = params;
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const rawGroup = await fetchRedis(
        'get',
        `group:${groupId}`,
    )
    const group = JSON.parse(rawGroup) as GroupType;

    const drawResults = await fetchRedis(
        'get',
        `group:${groupId}:draw-result`
    );
    const parsedDrawResults = JSON.parse(drawResults) as DrawResult[];

    return (
        <>
            <Menu group={group}
                  drawResults={parsedDrawResults}
                  userId={session.user.id}
            />
        </>
    )
}

export default Page;