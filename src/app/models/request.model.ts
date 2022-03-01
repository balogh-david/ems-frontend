import { Status } from "./status.model";

export interface RequestType {
  id: string;
  creator: string;
  subject: string;
  description: string;
  status: Status;
  creationDate: string;
}
