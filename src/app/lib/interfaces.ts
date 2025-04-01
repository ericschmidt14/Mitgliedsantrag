import { FormValues } from "../form/form";

export interface Result {
  token: string;
  mail: string;
  firstname: string;
  lastname: string;
  created: string;
  mailing: string;
  confirmed: string;
  json: FormValues;
}
