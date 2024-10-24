'use client'

import styles from './TabChristmasTree.module.scss';
import Image from "next/image";
import Tree from '@/../public/images/tree2.jpeg';
import axios from "axios";
import {useRouter} from "next/navigation";
import SendBtn from "@/components/UI/SendBtn";


interface TabChristmasTreeProps {
    group: GroupType;
    drawResults: DrawResult[];
    userId: string;
}

const TabChristmasTree = ({group, drawResults, userId}: TabChristmasTreeProps) => {
    const readyGifts = drawResults.filter((item) => item.alreadyGiven);
    const [yourDrawResult] = drawResults.filter((item) => item.donor.id === userId);
    const yourRecipientId = yourDrawResult.recipient.id;
    const router = useRouter();

    const progressClickHandler = async () => {
        await axios.post('/api/groups/give-gift', {
            recipientId: yourRecipientId,
            groupId: group.id,
        })
        router.refresh();
    }

    return (
        <div className={styles.container}>
            <div className={styles.alreadyGifted}>
                {yourDrawResult.alreadyGiven ? (
                    <p>Dodałeś prezent!</p>
                ) : (
                    <div className={styles.alreadyGifted__yes}>
                        <p>Kupiłeś już prezent? Kliknij tutaj:</p>
                        <SendBtn text={'Włóż prezent pod choinkę'}
                                 def={progressClickHandler}
                        />
                    </div>
                )}
            </div>
            <div className={styles.tree}>
                <Image className={styles.tree__img}
                       src={Tree}
                       alt={'christmas tree'}
                />
                <div className={styles.gifts}>
                    {readyGifts.map((el, i) => (
                        <div key={`el-${i}`} className={styles.gifts__el}>
                            <Image src={`/images/gifts/${el.giftPictureNum}.png`}
                                   className={styles.gifts__img}
                                   alt={`${el.recipient}'s gift`}
                                   fill
                                   sizes="100%"
                            />
                            <div className={styles.gifts__info}>
                                <p>{el.recipient.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TabChristmasTree;