import {ReactNode} from "react";

export interface LoginFormTypes {
    email: string;
    password: string;
}
export interface RegisterFormTypes extends LoginFormTypes{
    username: string;
}
export interface onCloseType{
    onClose?: () => void;
}
export interface onShowType{
    onShow?: (which: string) => void;
}

export interface ModalType {
    children: ReactNode;
}
export interface BackdropType extends onCloseType, onShowType{

}
export interface PortalTypes extends BackdropType, ModalType {

}