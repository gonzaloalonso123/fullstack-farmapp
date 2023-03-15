import React, { useContext, useRef, useState } from "react";
import { AnimalContext } from "../../context/AnimalContext";
import { AnimalConfig, StoreAnimal } from "../../types/types";
import "./StoreItem.css";
import { v4 as uuidv4 } from 'uuid';
import { addAnimal } from "../../client/client";

type StoreItemProps = {
  animal: StoreAnimal;
};

export const StoreItem = ({ animal }: StoreItemProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const elementSelect = useRef<HTMLSelectElement>(null);
  const directionSelect = useRef<HTMLSelectElement>(null);
  const speedSelect = useRef<HTMLSelectElement>(null);
  const handleClick = () => {
    setShowSettings(!showSettings);
  };

  const { animals, setAnimals } = useContext(AnimalContext);

  const handleAddToCollection = () => {
    const element = elementSelect.current!.value;
    const direction = directionSelect.current!.value;
    const speed = speedSelect.current!.value;
    const newAnimal: AnimalConfig = {
      id: uuidv4(),
      img: animal.img,
      name: animal.name,
      element: element,
      speed: parseInt(speed),
      direction: direction,
    };
    setAnimals([...animals, newAnimal]);
    addAnimal(newAnimal);
    console.log(newAnimal);
  };

  return (
    <div className="store-item-container">
      <div className="store-details-container">
        <img className="store-item-image" src={animal.img} alt="" />
        <label>{animal.name}</label>
        <button className="store-item-buy-button" onClick={handleClick}>
          &#8964;
        </button>
      </div>
      {showSettings && (
        <div className="store-settings-container">
          <div className="store-attr-container">
            <label>Element</label>
            <select className="store-element-select" ref={elementSelect}>
              <option>Sky</option>
              <option>Earth</option>
              <option>Water</option>
            </select>
          </div>
          <div className="store-attr-container">
            <label>Speed</label>
            <select className="store-speed-select" ref={speedSelect}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="store-attr-container">
            <label>Direction</label>
            <select className="store-element-select" ref={directionSelect}>
              <option>Right</option>
              <option>Left</option>
            </select>
          </div>
          <button
            className="store-add-to-collection-button"
            onClick={handleAddToCollection}
          >
            ADD TO COLLECTION
          </button>
        </div>
      )}
    </div>
  );
};
