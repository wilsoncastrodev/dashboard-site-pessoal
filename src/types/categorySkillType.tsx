export type CategorySkillResponseType = {
    _id: string,
    name: string,
    created_at: string,
    updated_at: string
};

export type CategorySkillStateType = {
    categorySkill: CategorySkillResponseType | any,
    errors: any,
    isLoading: boolean,
};
