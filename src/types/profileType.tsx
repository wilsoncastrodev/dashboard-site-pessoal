export type ProfileResponseType = {
    user: string,
    name: string,
    profession: string,
    aboutMe: string,
    characteristic: string[],
    education: any,
    experiences: any,
    interests: any,
    sourceKnowledge: any,
    skills: any,
    knowledge: any,
    messages: any,
    contacts: {
        location: string,
        website: string,
        phone: string
    },
    social: {
        github: string,
        linkedin: string
    },
    cv: any,
    created_at: string,
    updated_at: string
};

export type ProfileRequestType = {
    _id?: string,
    name: string,
    profession: string,
    aboutMe: string,
    characteristic: string[],
    contacts: {
        location: string,
        website: string,
        phone: string
    },
    social: {
        github: string,
        linkedin: string
    },
}

export type ProfileStateType = {
    profile: ProfileResponseType | any,
    errors: any,
    isLoading: boolean,
};
