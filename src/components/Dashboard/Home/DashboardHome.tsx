'use client'

import {useDispatch} from "react-redux";
import {setOff} from "@/redux/portalSlice";


const DashboardHome = () => {
    const dispatch = useDispatch();

    dispatch(setOff());
    return (
        <div>

        </div>
    )
}

export default DashboardHome;