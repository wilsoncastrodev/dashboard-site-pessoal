export type EducationResponseType = {
    _id: string,
    institution: string,
    degree: string,
    specialization: string,
    from: string,
    to: string,
    current: boolean,
    description: string,
    status: string,
    created_at: string,
    updated_at: string
};

export type EducationRequestType = {
    _id?: string,
    institution: string,
    degree: string,
    specialization: string,
    from: string,
    to: string,
    current: boolean,
    description: string,
    status: string,
    profile: {
        _id: string
    }
}

export type EducationStateType = {
    education: EducationResponseType | any,
    errors: any,
    isLoading: boolean,
};
