export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  pendingEmail?: string | null;
  username: string;
  password: string;
  role: string;
  verified: boolean;
  token?: string | null;
  isTokenUsed: boolean;
  deleted: boolean;
  deletedAt?: Date | null;
  emailVerificationExpires: Date | null;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}
