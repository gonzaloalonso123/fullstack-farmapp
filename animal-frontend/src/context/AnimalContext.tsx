import { createContext, useEffect, useState } from "react";
import { getAllAnimals } from "../client/client";
import { AnimalConfig } from "../types/types";

interface IAnimalContext {
  animals: AnimalConfig[];
  selectedAnimal: AnimalConfig | null;
  setAnimals: (animals: AnimalConfig[]) => void;
  removeAnimal: (id: string) => void;
  setSelectedAnimal: (animal: AnimalConfig | null) => void;
}

const firstVal = {
  selectedAnimal: null,
  animals: [],
  setAnimals: () => {},
  setSelectedAnimal: () => {},
  removeAnimal: () => {},
};

export const AnimalContext = createContext<IAnimalContext>(firstVal);

export const AnimalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [animals, setCurrentAnimals] = useState<AnimalConfig[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalConfig | null>(null);
  const removeAnimal = (id: string) => {
    console.log(id);
    setCurrentAnimals(animals.filter((animal) => animal.id !== id));
  };

  return (
    <AnimalContext.Provider
      value={{
        selectedAnimal : selectedAnimal,
        setSelectedAnimal: setSelectedAnimal,
        animals: animals,
        setAnimals: setCurrentAnimals,
        removeAnimal: removeAnimal,
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
};
