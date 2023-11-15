

import styles from './Profile.module.scss';
import SelectImg from "@/components/UI/SelectImg";
import {FC} from "react";

interface ProfileProps{
    chatPartner: User | RawGroupType;
}

const Profile: FC<ProfileProps> = ({chatPartner}) => {

    return (
        <div className={styles.container}>
            <div className={styles.partnerInfo}>
                <div className={styles.partnerInfo__img}>
                    <SelectImg selectedImg={'user'} height={50}/>
                </div>
                <p>{chatPartner.name}</p>
            </div>
        </div>
    )
}

export default Profile;