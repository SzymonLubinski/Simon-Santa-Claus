

import { FC } from 'react';
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

const Page: FC<PageProps> = async ({params}) => {
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
    const areYouCreator = session.user.id === group.creatorId;

    return (
        <div>
            <Menu group={group} drawResults={parsedDrawResults} areYouCreator={areYouCreator}/>
        </div>
    )
}

export default Page;