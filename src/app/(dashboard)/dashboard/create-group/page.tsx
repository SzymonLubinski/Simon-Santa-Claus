

import { FC } from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {notFound} from "next/navigation";
import {getFriendsByUserId} from "@/helpers/get-friends";
import CreateGroupForm from "@/components/Dashboard/CreateGroupForm";


interface ThisPageProps{}


const Page: FC<ThisPageProps> = async ({}) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();
    const friends = await getFriendsByUserId(session.user.id);

    return (
        <div>
            <CreateGroupForm friends={friends}/>
        </div>
    )
}

export default Page;