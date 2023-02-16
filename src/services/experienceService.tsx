import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { ExperienceRequestType, ExperienceResponseType } from '../types/experienceType';

const getAllProfileExperience = (profileId: string): Promise<AxiosResponse<ExperienceResponseType>> => {
    return api.get<ExperienceResponseType>(`experiences/${profileId}/profile`);
}

const createExperience = (payload: ExperienceRequestType): Promise<AxiosResponse<ExperienceResponseType>> => {
    return api.post<ExperienceResponseType>(`experiences`, payload);
}

const updateExperience = (payload: ExperienceRequestType): Promise<AxiosResponse<ExperienceResponseType>> => {
    return api.patch<ExperienceResponseType>(`experiences/${payload._id}`, payload);
}

const deleteExperience = (id: string): Promise<AxiosResponse> => {
    return api.delete(`experiences/${id}`);
}

const ExperienceService = {
    getAllProfileExperience,
    createExperience,
    updateExperience,
    deleteExperience
};

export default ExperienceService;
