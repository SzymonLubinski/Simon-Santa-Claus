'use client'

import styles from './TabMemberList.module.scss';
import {useEffect, useState} from "react";
import {checkEveryoneHasEmail} from "@/helpers/functions";
import axios from "axios";
import MemberCard from "@/components/Groups/MemberCard";


interface MemberListProps {
    group: GroupType;
    drawResults: DrawResult[];
    userId: string;
}


const TabMemberList = ({group, drawResults, userId}: MemberListProps) => {
    const [hasEveryoneEmail, setHasEveryoneEmail] = useState<boolean>(true);
    const friends = [...group.loggedFriends, ...group.externalFriends];
    const sendEmail = async (email: string, memberName: string) => {

        try {
            if (!drawResults) return;
            const [member] = drawResults.filter(
                (member) => member.donor.name === memberName
            );
            await axios.post('/api/email', {
                email: email,
                memberName: memberName,
                recipientName: member.recipient.name,
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setHasEveryoneEmail(
            checkEveryoneHasEmail(group.externalFriends)
        );
    }, [group]);

    return (
        <div className={styles.all}>
            {!hasEveryoneEmail && (
                <div className={styles.bottomInfo}>
                    <p className={styles.bottomInfo__svgDiv}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 128 512">
                            <path
                                d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
                        </svg>
                    </p>
                    <p>
                        Pamiętaj, że jeśli użytownik nie ma wprowadzonego adresu email,
                        nie mamy możliwości wysłać mu powiadomienia, kogo wylosował.
                        Jedynym sposobem pozostanie przekazanie indywidualnego linku,
                        pod którym znajdzie informacje komu kupi prezent.
                    </p>
                </div>
            )}
            <ul className={styles.userList}>
                {friends.map((friend) => (
                    <MemberCard key={friend.id}
                                member={friend}
                                groupId={group.id}
                                def={() => sendEmail(friend.email, friend.name)}
                                userAccess={friend.id === userId || group.creatorId === userId}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TabMemberList;