import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { SkillRequestType, SkillResponseType } from '../types/skillType';

const getAllProfileSkill = (profileId: string): Promise<AxiosResponse<SkillResponseType>> => {
    return api.get<SkillResponseType>(`skills/${profileId}/profile`);
}

const createSkill = (payload: SkillRequestType): Promise<AxiosResponse<SkillResponseType>> => {
    return api.post<SkillResponseType>(`skills`, payload);
}

const updateSkill = (payload: SkillRequestType): Promise<AxiosResponse<SkillResponseType>> => {
    return api.patch<SkillResponseType>(`skills/${payload._id}`, payload);
}

const deleteSkill = (id: string): Promise<AxiosResponse> => {
    return api.delete(`skills/${id}`);
}

const SkillService = {
    getAllProfileSkill,
    createSkill,
    updateSkill,
    deleteSkill
};

export default SkillService;
