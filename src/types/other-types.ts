
export interface LoginFormTypes {
    email: string;
    password: string;
}
export interface RegisterFormTypes extends LoginFormTypes{
    username: string;
}