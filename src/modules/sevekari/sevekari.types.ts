import { Types } from "mongoose";

export interface ISevekari {
  firstName: string;
  middleName: string;
  lastName: string;
  mobile: string;
  mobileAlt?: string;
  email?: string;
  address: string;
  deleted: boolean;
  templeId: Types.ObjectId | string;
}
