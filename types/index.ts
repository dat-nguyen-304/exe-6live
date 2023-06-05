import { company } from "@/pages/companies/[companyId]";

export type Kol = {
  id: string;
  email: string;
  image: string;
  name: string;
  age: string;
  phone: string;
  salary: string;
  location: Location;
  price: string;
  gender: Gender;
  status: boolean;
  industries: Industry[];
  description: string;
  createdDate?: string;
  updatedDate?: string;
};

export type User = {
  id?: string;
  email: string;
  role: UserRole;
  createdDate?: string;
  updatedDate?: string;
};

export type Company = {
  id: string;
  email: string;
  image: string;
  name: string;
  phone: string;
  location: Location[];
  description: string;
  img: string;
  createdDate?: string;
  updatedDate?: string;
};

export enum UserRole {
  kol = "kol",
  company = "company",
}

export enum Industry {
  food = "food",
  clothes = "clothes",
  cosmetology = "cosmetology",
  accessory = "accessory",
}

export enum Gender {
  male = "male",
  female = "female",
  lgbt = "lgbt",
}

export enum Location {
  hcm = "hcm",
  hn = "hn",
  dn = "dn",
}
