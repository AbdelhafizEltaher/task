export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  nationality_Id: number;
  role_Id: string;
  country_Id: number;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  isActive: boolean;
  fullName: string;
  normalizedEmail: string;
  normalizedUserName: string;
  phoneNumberConfirmed: boolean;
  emailConfirmed: boolean;
}
