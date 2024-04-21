import React from "react";
import { Welcome_Factory, Footer, Meme_Search } from './content';
import greek_city from "../../../images/greek_city_4.jpeg"; 

const Factory = () => {
  // Estilo para el contenedor de fondo con desenfoque
  const backgroundStyle = {
    backgroundImage: `url(${greek_city})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',  // Asegura que cubra al menos la altura completa de la ventana
    filter: 'blur(10px)', // Aplica un filtro de desenfoque
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1  // Asegura que el fondo esté detrás de todo el contenido
  };

  return (
    <div className="relative min-h-screen"> {/* Establece la posición relativa para el contenedor principal */}
      <div style={backgroundStyle}></div> {/* Contenedor de fondo desenfocado */}
       <div className="z-20 relative"> {/* Contenedor para el contenido para asegurar que esté por encima del fondo desenfocado */}
       <div>
        <Welcome_Factory />
       </div>
        <div>
        <Meme_Search/>
            <Footer />
        </div>
        </div>
    </div>
  );
};

export default Factory;
