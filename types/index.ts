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
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
};

export type Company = {
  id: string;
  name: string;
  location: string[];
  description: string;
  img: string;
};
