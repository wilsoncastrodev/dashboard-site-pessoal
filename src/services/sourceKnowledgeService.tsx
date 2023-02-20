import { api, fileApi } from '../config/api'
import { AxiosResponse } from "axios";
import { SourceKnowledgeRequestType, SourceKnowledgeResponseType } from '../types/sourceKnowledgeType';

const getAllProfileSourceKnowledge = (profileId: string): Promise<AxiosResponse<SourceKnowledgeResponseType>> => {
    return api.get<SourceKnowledgeResponseType>(`sources-knowledge/${profileId}/profile`);
}

const createSourceKnowledge = (payload: SourceKnowledgeRequestType): Promise<AxiosResponse<SourceKnowledgeResponseType>> => {
    return fileApi.post<SourceKnowledgeResponseType>(`sources-knowledge`, payload);
}

const updateSourceKnowledge = (payload: SourceKnowledgeRequestType): Promise<AxiosResponse<SourceKnowledgeResponseType>> => {
    return fileApi.patch<SourceKnowledgeResponseType>(`sources-knowledge/${payload._id}`, payload);
}

const deleteSourceKnowledge = (id: string): Promise<AxiosResponse> => {
    return api.delete(`sources-knowledge/${id}`);
}

const SourceKnowledgeService = {
    getAllProfileSourceKnowledge,
    createSourceKnowledge,
    updateSourceKnowledge,
    deleteSourceKnowledge
};

export default SourceKnowledgeService;
