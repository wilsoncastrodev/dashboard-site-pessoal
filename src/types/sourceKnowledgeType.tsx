export type SourceKnowledgeResponseType = {
    _id: string,
    description: string,
    link: string,
    image: any,
    created_at: string,
    updated_at: string
};

export type SourceKnowledgeRequestType = {
    _id?: string,
    description: string,
    link: string,
    image: any,
    profile: {
        _id: string
    }
}

export type SourceKnowledgeStateType = {
    sourceKnowledge: SourceKnowledgeResponseType | any,
    errors: any,
    isLoading: boolean,
};
