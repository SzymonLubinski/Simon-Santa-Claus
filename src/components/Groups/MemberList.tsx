'use client'

import styles from './MemberList.module.scss';
import {FC, useEffect, useState} from "react";
import Link from "next/link";
import {checkEveryoneHasEmail} from "@/helpers/functions";
import axios from "axios";
import MemberCard from "@/components/Groups/MemberCard";


interface MenuProps {
    group: GroupType;
    drawResults: DrawResult[] | null;
    areYouCreator: boolean;
}


const MemberList: FC<MenuProps> = ({group, drawResults, areYouCreator}) => {
    const sendEmail = async (friend: User) => {
        try {
            if (!drawResults) return;
            const [member] = drawResults.filter(
                (member) => member.name === friend.name
            );
            await axios.post('/api/email', {
                email: friend.email,
                memberName: friend.name,
                endowedName: member.endowed.name,
            })
        } catch (error){
            console.error(error);
        }
    }

    return (
        <div className={styles.all}>
            <div>
                <ul className={styles.userList}>
                    {group.externalFriends.map((friend) => (
                        <MemberCard key={friend.id} member={friend} groupId={group.id}/>
                    ))}
                    {group.loggedFriends.map((friend) => (
                        <MemberCard key={friend.id} member={friend} groupId={group.id}/>
                    ))}
                </ul>
            </div>
            {/*{isBeforeDrawing && areYouCreator ? (*/}
            {/*    <div className={styles.drawing}>*/}

            {/*        <div className={styles.drawing__link}>*/}
            {/*            <Link href={`/dashboard/group/KcrE6TGWoDHU-ZTHtTEPo/group-draw`}>*/}
            {/*                Przejdź do losowania*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <div>*/}
            {/*        {drawResults?.map((member) => (*/}
            {/*            <div key={member.id}>*/}
            {/*                <h3>{member.name}</h3>*/}
            {/*                <p>endowed: {member.endowed.name}</p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}

export default MemberList;