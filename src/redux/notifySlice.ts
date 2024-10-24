import { createSlice } from '@reduxjs/toolkit'
import {NotifyItem, NotifyProps} from "@/types/other-types";
import type { PayloadAction } from '@reduxjs/toolkit'


interface NotifyState {
    notifications: NotifyProps[];
}

const initialState: NotifyState = {
    notifications: [],
}

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        addNotify: (state, action: PayloadAction<NotifyProps>) => {
            state.notifications = [...state.notifications, action.payload]
        },
        removeNotify: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter((notify) => notify.id != action.payload)
        },
    },
})

export const {addNotify, removeNotify} = notifySlice.actions
export default notifySlice.reducer