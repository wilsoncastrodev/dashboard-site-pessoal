import { MDCSnackbar } from '@material/snackbar';

export const getUserCurrent = (): any => JSON.parse(localStorage.getItem('userCurrent')!);

export const setUserCurrent = (user: any): void => localStorage.setItem('userCurrent', JSON.stringify(user));

export const firstLetterName = (name: string) => name.charAt(0);

export const nameShort = (name: string) => name.split(" ")[0] + " " + name.split(" ")[1];
