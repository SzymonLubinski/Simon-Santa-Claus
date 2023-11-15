

import {FC} from 'react';
import LoginPage from "@/components/Main/LoginPage";
import Background from "@/components/Main/Background";


interface ThisPageProps {

}


const Page: FC<ThisPageProps> = ({}) => {

    return (
        <Background>
            <LoginPage/>
        </Background>
    )
}

export default Page;