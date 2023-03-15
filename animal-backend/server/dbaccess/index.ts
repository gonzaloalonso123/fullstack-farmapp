import { AnimalConfig } from "../types/types";
import { addOne, deleteOne, getAll, updateOne } from "./dbaccess";

export const postAnimal = (animal: AnimalConfig) => addOne(animal);
export const getAnimals = () => getAll();
export const deleteAnimal = (id : string) => deleteOne(id);
export const updateAnimal = (animal : AnimalConfig) => updateOne(animal);
