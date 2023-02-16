export type ExperienceResponseType = {
    _id: string,
    position: string,
    company: string,
    from: string,
    to: string,
    current: boolean,
    description: string,
    technologies: string[],
    created_at: string,
    updated_at: string
};

export type ExperienceRequestType = {
    _id?: string,
    position: string,
    company: string,
    from: string,
    to: string,
    current: boolean,
    description: string,
    technologies: string[],
    profile: {
        _id: string
    }
}

export type ExperienceStateType = {
    experience: ExperienceResponseType | any,
    errors: any,
    isLoading: boolean,
};
