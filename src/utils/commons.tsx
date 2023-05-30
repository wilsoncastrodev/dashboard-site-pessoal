export const getUserCurrent = (): any => JSON.parse(localStorage.getItem('userCurrent')!);

export const setUserCurrent = (user: any): void => localStorage.setItem('userCurrent', JSON.stringify(user));

export const clearUserCurrent = (): void => localStorage.removeItem('userCurrent');

export const firstLetterName = (name: string) => name.charAt(0);

export const nameShort = (name: string) => name.split(" ")[1] ? name.split(" ")[0] + " " + name.split(" ")[1] : name.split(" ")[0];

export const convertUrlToFile = async (url: string, filename: string, type: string = `image/jpeg`) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename!, { type: type });
}

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

