export type Kol = {
  id: string;
  email: string;
  image: string;
  name: string;
  age?: string;
  phone?: string;
  salary?: string;
  location?: Location;
  price?: string;
  gender?: Gender;
  status?: boolean;
  industries?: Industry[];
  platforms?: Platform[];
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id?: string;
  email: string;
  role: UserRole;
  isVip?: boolean;
  expiredVipDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: string;
  email: string;
  image: string;
  name: string;
  phone?: string;
  platforms?: Platform[];
  locations?: Location[];
  campaigns?: Campaign[];
  description?: string;
  addresses?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Campaign = {
  id?: string;
  companyId: string;
  title: string;
  expiredDate: Date;
  status: boolean;
  minAge: number;
  maxAge: number;
  minSalary: number;
  maxSalary: number;
  image: string;
  industry: Industry;
  locations: Location[];
  genders: Gender[];
  platforms: Platform[];
  description: string;
  benefit: string;
  createdAt: string;
  updatedAt: string;
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

export enum Platform {
  facebook = "facebook",
  youtube = "youtube",
  tiktok = "tiktok",
  instagram = "instagram",
  shopee = "shopee",
}
