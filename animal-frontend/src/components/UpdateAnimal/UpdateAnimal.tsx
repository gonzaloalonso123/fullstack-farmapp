import React, { useContext, useEffect, useRef, useState } from "react";
import { updateAnimal } from "../../client/client";
import { AnimalContext } from "../../context/AnimalContext";
import "./UpdateAnimal.css";

export const UpdateAnimal = () => {
  const { selectedAnimal } = useContext(AnimalContext);
  const elementSelect = useRef<HTMLSelectElement>(null);
  const speedSelect = useRef<HTMLSelectElement>(null);
  const directionSelect = useRef<HTMLSelectElement>(null);
  const [isDoneVisible, setIsDoneVisible] = useState(false);
  const { setAnimals, animals } = useContext(AnimalContext);

  const updateThis = async () => {
    if (selectedAnimal) {
      const newAnimal = {
        ...selectedAnimal,
        element: elementSelect.current!.value,
        speed: parseInt(speedSelect.current!.value),
        direction: directionSelect.current!.value,
      };
      await updateAnimal(newAnimal);
      setAnimals([...animals.filter(animal => animal.id !== selectedAnimal!.id), newAnimal])
      setIsDoneVisible(true);
      setTimeout(() => setIsDoneVisible(false), 1000);
    }
  };

  useEffect(() => {
    elementSelect.current!.value = selectedAnimal!.element;
    speedSelect.current!.value = selectedAnimal!.speed + "";
    directionSelect.current!.value = selectedAnimal!.direction;
  }, [selectedAnimal]);

  return (
    <div className="update-animal-container">
      <h4>{selectedAnimal?.id}</h4>
      <label>Element</label>
      <select className="store-element-select" ref={elementSelect}>
        <option value="Sky">Sky</option>
        <option value="Earth">Earth</option>
        <option value="Water">Water</option>
      </select>
      <label>Speed</label>
      <select className="store-speed-select" ref={speedSelect}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label>Direction</label>
      <select className="store-element-select" ref={directionSelect}>
        <option value="Right">Right</option>
        <option value="Left">Left</option>
      </select>
      <button className="update-button" onClick={updateThis}>
        UPDATE
      </button>
      {isDoneVisible && <label>Done!</label>}
    </div>
  );
};
