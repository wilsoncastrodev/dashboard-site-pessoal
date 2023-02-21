import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { CategoryKnowledgeResponseType } from '../types/categoryKnowledgeType';

const getAllCategoryKnowledge = (): Promise<AxiosResponse<CategoryKnowledgeResponseType>> => {
    return api.get<CategoryKnowledgeResponseType>(`category-knowledge`);
}

const CategoryKnowledgeService = {
    getAllCategoryKnowledge,
};

export default CategoryKnowledgeService;
