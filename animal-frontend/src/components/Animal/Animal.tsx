import React, { useContext, useEffect, useState } from "react";
import { AnimalContext } from "../../context/AnimalContext";
import { AnimalConfig } from "../../types/types";
import "./Animal.css";
import Flame from "../../images/flames.png";
import { deleteAnimal } from "../../client/client";

type AnimalProps = {
  animal: AnimalConfig;
  time: number;
  layoutWidth: number;
  layoutHeight: number;
};

export const Animal = ({
  animal,
  time,
  layoutWidth,
  layoutHeight,
}: AnimalProps) => {
  const [Xdirection, setXDirection] = useState(1);
  const [Ydirection, setYDirection] = useState(1);
  const [currentXPosition, setCurrentXPosition] = useState(0);
  const [currentYPosition, setCurrentYPosition] = useState(0);
  const [imageOrientation, setImageOrientation] = useState(0);
  const { removeAnimal, selectedAnimal, setSelectedAnimal } =
    useContext(AnimalContext);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    calcPosition();
  }, [time]);

  useEffect(() => {
    setImageOrientation(animal.direction === "Right" ? 1 : -1);
  }, []);

  const calcPosition = () => {
    if (isDeleted) {
      setXDirection(-Xdirection);
      setYDirection(-Ydirection);
    }
    if (currentXPosition < 50) {
      setXDirection(1);
    } else if (currentXPosition > layoutWidth - 100) {
      setXDirection(-1);
    }
    if (currentYPosition < 50) {
      setYDirection(1);
    } else if (currentYPosition > layoutHeight - 100) {
      setYDirection(-1);
    }
    setCurrentXPosition(currentXPosition + Xdirection * animal.speed);
    setCurrentYPosition(currentYPosition + Ydirection * animal.speed);
  };

  const randomizePosition = () => {
    setCurrentXPosition(Math.random() * (layoutWidth - 100));
    setCurrentYPosition(Math.random() * (layoutHeight - 100));
  };

  const remove = () => {
    setIsDeleted(true);
    setTimeout(() => {
      removeAnimal(animal.id);
      deleteAnimal(animal.id);
    }, 1300);
  };

  useEffect(() => {
    randomizePosition();
  }, []);

  const handleClick = () => {
    if (selectedAnimal && selectedAnimal.id !== animal.id) {
      setSelectedAnimal(animal);
    } else if (!selectedAnimal) {
      setSelectedAnimal(animal);
    } else {
      setSelectedAnimal(null);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="animal-container"
      style={{
        marginLeft: currentXPosition,
        marginTop: currentYPosition,
      }}
    >
      <img
        className="animal-img"
        src={!isDeleted ? animal.img : Flame}
        style={{
          transform:
            Xdirection == 1
              ? `scaleX(${imageOrientation})`
              : `scaleX(${-imageOrientation})`,
        }}
      />
      {selectedAnimal && selectedAnimal.id === animal.id && (
        <>
          <button className="animal-button" onClick={remove}>
            DELETE
          </button>
        </>
      )}
    </div>
  );
};
