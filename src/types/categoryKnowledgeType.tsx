export type CategoryKnowledgeResponseType = {
    _id: string,
    name: string,
    created_at: string,
    updated_at: string
};

export type CategoryKnowledgeRequestType = {
    _id?: string,
    name: string,
    profile: {
        _id: string
    }
}

export type CategoryKnowledgeStateType = {
    categoryKnowledge: CategoryKnowledgeResponseType | any,
    errors: any,
    isLoading: boolean,
};
