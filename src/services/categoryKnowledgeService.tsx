import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { CategoryKnowledgeRequestType, CategoryKnowledgeResponseType } from '../types/categoryKnowledgeType';

const getAllCategoryKnowledge = (): Promise<AxiosResponse<CategoryKnowledgeResponseType>> => {
    return api.get<CategoryKnowledgeResponseType>(`category-knowledge`);
}

const createCategoryKnowledge = (payload: CategoryKnowledgeRequestType): Promise<AxiosResponse<CategoryKnowledgeResponseType>> => {
    return api.post<CategoryKnowledgeResponseType>(`category-knowledge`, payload);
}

const updateCategoryKnowledge = (payload: CategoryKnowledgeRequestType): Promise<AxiosResponse<CategoryKnowledgeResponseType>> => {
    return api.patch<CategoryKnowledgeResponseType>(`category-knowledge/${payload._id}`, payload);
}

const deleteCategoryKnowledge = (id: string): Promise<AxiosResponse> => {
    return api.delete(`category-knowledge/${id}`);
}

const CategoryKnowledgeService = {
    getAllCategoryKnowledge,
    createCategoryKnowledge,
    updateCategoryKnowledge,
    deleteCategoryKnowledge
};

export default CategoryKnowledgeService;
