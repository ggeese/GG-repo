import React from 'react';
import Welcome from './content/Welcome';
import Info from './content/Info';
import Token_Info from './content/Token_Info';
import Hatching from './content/Hatching';
import FAQ from './content/FAQ';
import goose_2 from "../../../images/goose_2.png"; 

const Home = () => {
  return (
    <div className="flex justify-between items-end min-h-screen">
      <div>
        <Welcome/>
        <Token_Info/>
        <Info/>
        <Hatching/>
        <FAQ/>
      </div>
      <div className="fixed bottom-0 right-0">
        <img
          src={goose_2}
          alt="Goose"
          className="w-80 h-auto" // Ajusta el tamaño de la imagen según sea necesario
        />
      </div>
    </div>
  );
}

export default Home;
