export enum UserType {
  USER = "user",
  SYSTEM = "system"
}

export interface IUserProfile {
  userId: string | null;
  username: string;
  fullname: string;
  roles: string[];
  isAuthenticated: boolean;
}

export const getSessionlessProfile = (): IUserProfile => {
  return {
    userId: null,
    username: '',
    fullname: '',
    roles: [],
    isAuthenticated: false
  }
}
