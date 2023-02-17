export type InterestResponseType = {
    _id: string,
    content: string,
    image: any,
    created_at: string,
    updated_at: string
};

export type InterestRequestType = {
    _id?: string,
    content: string,
    image: any,
    profile: {
        _id: string
    }
}

export type InterestStateType = {
    interest: InterestResponseType | any,
    errors: any,
    isLoading: boolean,
};
