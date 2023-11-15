import { FC } from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


interface loadingProps{}

const loading: FC<loadingProps> = ({}) => {
    return (
        <div>
            <Skeleton height={60} width={300}/>
            <Skeleton height={60} width={300}/>
            <Skeleton height={60} width={300}/>
            <Skeleton height={60} width={300}/>
            <Skeleton height={150} width={250}/>
            <Skeleton height={50} width={100}/>
        </div>
    )
}

export default loading;