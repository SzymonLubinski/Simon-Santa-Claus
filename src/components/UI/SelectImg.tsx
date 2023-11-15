'use client'

import {FC} from "react";
import Image, {StaticImageData} from "next/image";
import styles from './SelectImg.module.scss';
import santaImg from '../../../public/logo.png';
import userImg from '../../../public/icons/user-solid.svg';
import LogOutImg from '../../../public/icons/arrow-right-from-bracket-solid.svg';
import ImgIcon from '../../../public/icons/image-icon.svg';
import Chain from '../../../public/home/wieniec2.png';
import NextJs from '../../../public/icons/next.svg';
import GitHub from '../../../public/icons/github-white.svg';
import LinkedIn from '../../../public/icons/linkedin-white.svg';
import Gmail from '../../../public/icons/gmail.svg';
import Plus from  '../../../public/icons/plus-solid.svg';
import ArrowRight from  '../../../public/icons/arrow-right-solid.svg';
import Copy from  '../../../public/icons/copy.svg';
import Plane from '../../../public/icons/paper-plane-solid.svg';
import CheckOk from '../../../public/icons/ok.svg';


interface SelectImgProps {
    selectedImg: 'santa' | 'user' | 'logout' | 'image' | 'nextjs' | 'gmail'
        | 'github' | 'linkedin' | 'chain' | 'plus' | 'arrow-right' | 'copy'
        | 'plane' | 'ok';
    height: number;
}

type imgItem = {
    item: StaticImageData,
    command: string;
}


const SelectImg: FC<SelectImgProps> = ({selectedImg, height}) => {

    const imgList: imgItem[] = [
        {item: santaImg, command: 'santa'},
        {item: userImg, command: 'user'},
        {item: LogOutImg, command: 'logout'},
        {item: ImgIcon, command: 'image'},
        {item: Chain, command: 'chain'},
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