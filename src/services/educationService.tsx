import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { EducationRequestType, EducationResponseType } from '../types/educationType';

const getAllProfileEducation = (profileId: string): Promise<AxiosResponse<EducationResponseType>> => {
    return api.get<EducationResponseType>(`educations/${profileId}/profile`);
}

const createEducation = (payload: EducationRequestType): Promise<AxiosResponse<EducationResponseType>> => {
    return api.post<EducationResponseType>(`educations`, payload);
}

const updateEducation = (payload: EducationRequestType): Promise<AxiosResponse<EducationResponseType>> => {
    return api.patch<EducationResponseType>(`educations/${payload._id}`, payload);
}

const deleteEducation = (id: string): Promise<AxiosResponse> => {
    return api.delete(`educations/${id}`);
}

const EducationService = {
    getAllProfileEducation,
    createEducation,
    updateEducation,
    deleteEducation
};

export default EducationService;
