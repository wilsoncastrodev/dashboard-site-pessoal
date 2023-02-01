export const getToken = (): any => JSON.parse(localStorage.getItem('token')!);

export const setToken = (token: any): void => localStorage.setItem('token', JSON.stringify(token));

export const clearToken = (): void => localStorage.removeItem('token');
