
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
        }}>
            <Skeleton height={800} width={300}/>
            <div>
                <Skeleton height={20} width={150}/>
                <Skeleton height={50} width={300}/>
            </div>
        </div>
    )
}

export default loading;