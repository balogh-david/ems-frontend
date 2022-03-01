import { IDate } from "./base.model";
import { Permission } from "./permission.model";

export interface UserType {
  id: string;
  name: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  permission: Permission;
  date: IDate;
  daysOff?: string;
  position?: string;
}
