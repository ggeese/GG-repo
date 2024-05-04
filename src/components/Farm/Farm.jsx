import React from "react";
import { Info, Pools, Footer } from './content';
import farm2 from "../../../images/farm2.jpeg"; 


const Farm = () => {

  // Estableciendo el estilo de fondo con la imagen farm2
  const backgroundStyle = {
    backgroundImage: `url(${farm2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(7px)', // Aplica el filtro de desenfoque directamente a la imagen
    minHeight: '100vh', // Cubre al menos la altura completa de la pantalla
  };



  return ( 
    <div className="relative min-h-screen"> {/* Establece la posición relativa */}
      <div style={backgroundStyle} className="absolute inset-0"></div> {/* Capa de fondo con desenfoque */}
      <div className="relative z- bg-black bg-opacity-50"> {/* Capa de contenido con un z-index más alto para estar sobre el fondo */}
        <Info />

        <Pools />

        <Footer />
      </div>
    </div>
  );
};


export default Farm;
