import { Permission } from "./permission.model";

export interface LoginResponse {
  token: string;
  userName: string;
  permission: Permission;
  id: string;
  tokenCreationDate: Date;
}
