import {addNotify, removeNotify} from "@/redux/notifySlice";
import {NotifyItem} from "@/types/other-types";


export const autoRemove = (id: number, dispatch: Function) => {
    setTimeout(() => {
        dispatch(removeNotify(id));
    }, 5 * 1000);
}

export const handleAddNotify = (notify: NotifyItem, dispatch: Function) => {
    const id = Date.now();
    dispatch(addNotify({
        id: id,
        message: notify.message,
        type: notify.type,
    }));
    autoRemove(id, dispatch);
}