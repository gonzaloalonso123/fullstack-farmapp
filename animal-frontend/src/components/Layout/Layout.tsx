import { useContext, useEffect, useRef, useState } from "react";
import { getAllAnimals } from "../../client/client";
import { AnimalContext } from "../../context/AnimalContext";
import { Animal } from "../Animal/Animal";
import { UpdateAnimal } from "../UpdateAnimal/UpdateAnimal";
import "./Layout.css";

export const Layout = () => {
  const { animals, setAnimals, selectedAnimal } = useContext(AnimalContext);
  const [time, setTime] = useState(0);
  const skyRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 100);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const animals = await getAllAnimals();
      console.log(animals);
      setAnimals(animals);
    };
    getData();
  }, []);

  return (
    <div className="layout-container">
      {selectedAnimal !== null && <UpdateAnimal />}
      <div className="layout-sky" ref={skyRef}>
        {animals
          .filter((animal) => animal.element === "Sky")
          .map((animal) => (
            <Animal
              animal={animal}
              time={time}
              layoutWidth={skyRef.current!.offsetWidth}
              layoutHeight={skyRef.current!.offsetHeight}
            />
          ))}
      </div>
      <div className="layout-earth" ref={earthRef}>
        {animals
          .filter((animal) => animal.element === "Earth")
          .map((animal) => (
            <Animal
              animal={animal}
              time={time}
              layoutWidth={earthRef.current!.offsetWidth}
              layoutHeight={earthRef.current!.offsetHeight}
            />
          ))}
      </div>
    </div>
  );
};
