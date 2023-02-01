import { ReactElement } from "react";
import { UserType } from './userType';

export type LoginRequestType = {
    email: string;
    password: string;
}

export type RegisterRequestType = {
    name: string;
    email: string;
    password: string;
}

export type AuthResponseType = {
    token: string;
    user: UserType;
};

export type AuthStateType = {
    user: UserType | null,
    errors: any,
    isLoading: boolean,
};

export type ProtectedRoutesProps = {
    children: ReactElement;
};
