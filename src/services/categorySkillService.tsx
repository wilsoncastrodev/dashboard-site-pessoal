import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { CategorySkillRequestType, CategorySkillResponseType } from '../types/categorySkillType';

const getAllCategorySkill = (): Promise<AxiosResponse<CategorySkillResponseType>> => {
    return api.get<CategorySkillResponseType>(`category-skills`);
}

const createCategorySkill = (payload: CategorySkillRequestType): Promise<AxiosResponse<CategorySkillResponseType>> => {
    return api.post<CategorySkillResponseType>(`category-skills`, payload);
}

const updateCategorySkill = (payload: CategorySkillRequestType): Promise<AxiosResponse<CategorySkillResponseType>> => {
    return api.patch<CategorySkillResponseType>(`category-skills/${payload._id}`, payload);
}

const deleteCategorySkill = (id: string): Promise<AxiosResponse> => {
    return api.delete(`category-skills/${id}`);
}

const CategorySkillService = {
    getAllCategorySkill,
    createCategorySkill,
    updateCategorySkill,
    deleteCategorySkill
};

export default CategorySkillService;
