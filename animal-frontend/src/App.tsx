import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Store } from "./components/Store/Store";
import { AnimalContextProvider } from "./context/AnimalContext";

function App() {
  return (
    <div className="App">
      <AnimalContextProvider>
        <Store />
        <Layout />
      </AnimalContextProvider>
    </div>
  );
}

export default App;
