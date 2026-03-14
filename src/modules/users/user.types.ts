export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  verified: boolean;
  token?: string;
  isTokenUsed: boolean;
  deleted: boolean;
  deletedAt?: Date | null;
}

export interface IUserMethods {
  comparePassword(password: string) : Promise<boolean>;
}