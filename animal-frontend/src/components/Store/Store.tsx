import axios from "axios";
import React, { useEffect, useState } from "react";
import { StoreItem } from "../StoreItem/StoreItem";
import { StoreSearchbar } from "../StoreSearchbar/StoreSearchbar";
import "./Store.css";

export const Store = () => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (currentSearch != "") {
      const getData = async () => {
        const items = await axios.get(
          `http://localhost:3000/api/images/${currentSearch}`
        );
        setCurrentItems(items.data.data);
      };
      getData();
    }
  }, [currentSearch]);

  return (
    <>
      <StoreSearchbar setCurrentSearch={setCurrentSearch} />
      <div className="store-container">
        {currentItems.map((animal: any) => {
          return (
            <StoreItem
              animal={{
                name: animal.description,
                img: animal.images["512"],
              }}
            />
          );
        })}
      </div>
    </>
  );
};
