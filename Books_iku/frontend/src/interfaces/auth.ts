export interface IUser{
    value: unknown;
	messages(arg0: string, messages: unknown): unknown;
	data: IUser;
    _id?:string | number;
    fullname:string,
    username:string,
    email:string,
    phone:string,
    password:string,
    confirmPassword:string,
    address:string,
    role:string,
    isBlocked:boolean,
    newPassword:string,
    oldPassword:string
}