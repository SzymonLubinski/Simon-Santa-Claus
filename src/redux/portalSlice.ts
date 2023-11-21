import { createSlice } from '@reduxjs/toolkit'


interface PortalState {
    active: boolean;
}

const initialState: PortalState = {
    active: false,
}

export const portalSlice = createSlice({
    name: 'portal',
    initialState,
    reducers: {
        setOff: (state) => {
            state.active = false;

        },
        setOn: (state) => {
            state.active = true;
        },
    },
})

export const { setOff, setOn } = portalSlice.actions
export default portalSlice.reducer