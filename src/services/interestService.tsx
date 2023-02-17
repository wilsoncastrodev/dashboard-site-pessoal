import { api, fileApi } from '../config/api'
import { AxiosResponse } from "axios";
import { InterestRequestType, InterestResponseType } from '../types/interestType';

const getAllProfileInterest = (profileId: string): Promise<AxiosResponse<InterestResponseType>> => {
    return api.get<InterestResponseType>(`interests/${profileId}/profile`);
}

const createInterest = (payload: InterestRequestType): Promise<AxiosResponse<InterestResponseType>> => {
    return fileApi.post<InterestResponseType>(`interests`, payload);
}

const updateInterest = (payload: InterestRequestType): Promise<AxiosResponse<InterestResponseType>> => {
    return fileApi.patch<InterestResponseType>(`interests/${payload._id}`, payload);
}

const deleteInterest = (id: string): Promise<AxiosResponse> => {
    return api.delete(`interests/${id}`);
}

const InterestService = {
    getAllProfileInterest,
    createInterest,
    updateInterest,
    deleteInterest
};

export default InterestService;
