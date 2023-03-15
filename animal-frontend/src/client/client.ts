import axios from "axios";
import { AnimalConfig } from "../types/types";

export const addAnimal = async (animal: AnimalConfig) => {
  return await axios({
    method: "post",
    url: `http://localhost:3000/api/animals/`,
    headers: {},
    data: animal,
  });
};

export const getAllAnimals = async () => {
  const res = await axios({
    method: "get",
    url: `http://localhost:3000/api/animals/`,
    headers: {},
  });
  return res.data;
};

export const deleteAnimal = async (id: string) => {
  return await axios({
    method: "delete",
    url: `http://localhost:3000/api/animals/${id}`,
    headers: {},
  });
};

export const updateAnimal = async (animal : AnimalConfig) => {
  return await axios({
    method: "patch",
    url: `http://localhost:3000/api/animals/${animal.id}`,
    data: animal,
    headers: {},
  });
};
