import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { KnowledgeRequestType, KnowledgeResponseType } from '../types/knowledgeType';

const getAllProfileKnowledge = (profileId: string): Promise<AxiosResponse<KnowledgeResponseType>> => {
    return api.get<KnowledgeResponseType>(`knowledge/${profileId}/profile`);
}

const createKnowledge = (payload: KnowledgeRequestType): Promise<AxiosResponse<KnowledgeResponseType>> => {
    return api.post<KnowledgeResponseType>(`knowledge`, payload);
}

const updateKnowledge = (payload: KnowledgeRequestType): Promise<AxiosResponse<KnowledgeResponseType>> => {
    return api.patch<KnowledgeResponseType>(`knowledge/${payload._id}`, payload);
}

const deleteKnowledge = (id: string): Promise<AxiosResponse> => {
    return api.delete(`knowledge/${id}`);
}

const sortKnowledge = (payload: KnowledgeRequestType): Promise<AxiosResponse<KnowledgeResponseType>> => {
    return api.post<KnowledgeResponseType>(`knowledge/sort-knowledge`, payload);
}

const KnowledgeService = {
    getAllProfileKnowledge,
    createKnowledge,
    updateKnowledge,
    deleteKnowledge,
    sortKnowledge
};

export default KnowledgeService;
