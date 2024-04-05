// context/test.js
import React, { createContext } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const sayhello = () => {
    console.log("Hello from MyContext!");
    // Aquí puedes realizar otras acciones si es necesario
  };

  return (
    <MyContext.Provider value={{ sayhello }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
