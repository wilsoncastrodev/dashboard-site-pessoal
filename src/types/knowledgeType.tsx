export type KnowledgeResponseType = {
    _id: string,
    name: string,
    categoryKnowledge: string,
    created_at: string,
    updated_at: string
};

export type KnowledgeRequestType = {
    _id?: string,
    name: string,
    categoryKnowledge: string,
    profile: {
        _id: string
    }
}

export type KnowledgeStateType = {
    knowledge: KnowledgeResponseType | any,
    errors: any,
    isLoading: boolean,
};
