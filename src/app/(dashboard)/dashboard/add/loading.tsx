
import { FC } from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


interface loadingProps{}

const loading: FC<loadingProps> = ({}) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
        }}>
            <Skeleton height={60} width={400}/>
            <Skeleton height={20} width={150}/>
            <Skeleton height={50} width={300}/>
        </div>
    )
}

export default loading;