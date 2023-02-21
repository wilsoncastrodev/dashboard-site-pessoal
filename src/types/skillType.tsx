export type SkillResponseType = {
    _id: string,
    name: string,
    level: number,
    categorySkill: string,
    created_at: string,
    updated_at: string
};

export type SkillRequestType = {
    _id?: string,
    name: string,
    level: number,
    categorySkill: string,
    profile: {
        _id: string
    }
}

export type SkillStateType = {
    skill: SkillResponseType | any,
    errors: any,
    isLoading: boolean,
};
