import React, { useRef } from "react";
import './StoreSearchbar.css';

type StoreSearchbarProps = {
  setCurrentSearch: (str: string) => void;
};

export const StoreSearchbar = ({ setCurrentSearch }: StoreSearchbarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    setCurrentSearch(inputRef.current!.value);
  };

  return (
    <div className="store-searchbar-container">
      <input type="text" className="store-searchbar-input" ref={inputRef} />
      <button className="store-searchbar-button" onClick={clickHandler}>
        search
      </button>
    </div>
  );
};
