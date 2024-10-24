'use client'

import Image, {StaticImageData} from "next/image";
import styles from './SelectImg.module.scss';
import santaImg from '../../../public/images/logo.png';
import userImg from '../../../public/images/icons/user-solid.svg';
import LogOutImg from '../../../public/images/icons/arrow-right-from-bracket-solid.svg';
import ImgIcon from '../../../public/images/icons/image-icon.svg';
import NextJs from '../../../public/images/icons/next.svg';
import GitHub from '../../../public/images/icons/github-white.svg';
import LinkedIn from '../../../public/images/icons/linkedin-white.svg';
import Gmail from '../../../public/images/icons/gmail.svg';
import Plus from  '../../../public/images/icons/plus-solid.svg';
import ArrowRight from  '../../../public/images/icons/arrow-right-solid.svg';
import Copy from  '../../../public/images/icons/copy.svg';
import Plane from '../../../public/images/icons/paper-plane-solid.svg';
import CheckOk from '../../../public/images/icons/ok.svg';


interface SelectImgProps {
    selectedImg: 'santa' | 'user' | 'logout' | 'image' | 'nextjs' | 'gmail'
        | 'github' | 'linkedin' | 'plus' | 'arrow-right' | 'copy'
        | 'plane' | 'ok';
    height?: number;
}

type imgItem = {
    item: StaticImageData,
    command: string;
}


const SelectImg = ({selectedImg, height}: SelectImgProps) => {

    const imgList: imgItem[] = [
        {item: santaImg, command: 'santa'},
        {item: userImg, command: 'user'},
        {item: LogOutImg, command: 'logout'},
        {item: ImgIcon, command: 'image'},
        {item: LinkedIn, command: 'linkedin'},
        {item: GitHub, command: 'github'},
        {item: NextJs, command: 'nextjs'},
        {item: Gmail, command: 'gmail'},
        {item: Plus, command: 'plus'},
        {item: ArrowRight, command: 'arrow-right'},
        {item: Copy, command: 'copy'},
        {item: Plane, command: 'plane'},
        {item: CheckOk, command: 'ok'},
    ];

    const thisImg = imgList.find((img) => img.command === selectedImg);

    if (thisImg === undefined) {
        return 'image SelectImg error!';
    }

    return (
        <Image className={styles.img}
               priority={true}
               height={height}
               src={thisImg.item}
               alt={'simon santa img'}
        />
    )
}

export default SelectImg;