import { api, fileApi } from '../config/api'
import { AxiosResponse } from "axios";
import { ProfileRequestType, ProfileResponseType } from '../types/profileType';

const getProfileById = (id: string): Promise<AxiosResponse<ProfileResponseType>> => {
    return api.get<ProfileResponseType>(`profiles/${id}`);
}

const updateProfile = (payload: ProfileRequestType): Promise<AxiosResponse<ProfileResponseType>> => {
    return fileApi.patch<ProfileResponseType>(`profiles/${payload._id}`, payload);
}

const AuthService = {
    getProfileById,
    updateProfile
};

export default AuthService;
