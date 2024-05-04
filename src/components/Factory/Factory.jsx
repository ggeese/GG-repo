import React from "react";
import { Welcome_Factory, Footer, Meme_Search } from './content';

const Factory = () => {
  // Estilo para el contenedor de fondo con desenfoque

  return (
    <div> {/* Establece la posición relativa para el contenedor principal */}
       <div>
        <Welcome_Factory />
       </div>
        <div>
        <Meme_Search/>
            <Footer />
        </div>
    </div>
  );
};

export default Factory;
