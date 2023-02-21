import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { CategorySkillResponseType } from '../types/categorySkillType';

const getAllCategorySkill = (): Promise<AxiosResponse<CategorySkillResponseType>> => {
    return api.get<CategorySkillResponseType>(`category-skills`);
}

const CategorySkillService = {
    getAllCategorySkill,
};

export default CategorySkillService;
