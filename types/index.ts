import { company } from "@/pages/companies/[companyId]";

export type KOL = {
  id: string;
  name: string;
  age: string;
  location: string;
  price: string;
  gender: string;
  description: string;
};

export type User = {
  email: string;
  name: string;
  image: string;
};

export type Company = {
  id: string;
  name: string;
  location: string[];
  description: string;
  img: string;
};

export enum UserRole {
  kol = "kol",
  company = "company",
}
