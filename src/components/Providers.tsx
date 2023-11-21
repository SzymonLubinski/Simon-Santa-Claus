'use client'

import {FC, ReactNode} from 'react';
import {Provider} from "react-redux";
import {store} from "@/redux/store";


interface ProvidersProps{
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Providers;