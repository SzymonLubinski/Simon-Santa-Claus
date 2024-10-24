import { configureStore } from "@reduxjs/toolkit";
import portalReducer from './portalSlice';
import notifyReducer from './notifySlice';

export const store = configureStore({
    reducer: {
        portal: portalReducer,
        notify: notifyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch