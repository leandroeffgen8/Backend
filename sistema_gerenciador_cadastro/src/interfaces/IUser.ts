export interface IUser{
    name: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
    area: string; 
    photo?: string;
    isAdmin: boolean;
}