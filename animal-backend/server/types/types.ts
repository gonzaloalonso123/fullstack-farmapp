export type AnimalConfig = {
  id: string;
  img: string;
  name: string;
  element: string;
  speed: number;
  direction: string;
};

export type UserConfig = {
  id: string;
  name: string;
  password: string;
  animals: AnimalConfig[];
};
