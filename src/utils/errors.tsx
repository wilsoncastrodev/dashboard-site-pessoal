import { AxiosError } from "axios";

export const axiosErrorHandler = (err: any) => {
    const error = err as AxiosError;

    if (!error.response) {
        throw err;
    }

    return error.response.data;
}
