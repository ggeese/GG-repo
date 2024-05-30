import React from "react";
import { Welcome_Factory, Footer, Meme_Search } from './content';
import image_farm from '../../../images/nest.jpeg';

const Factory = () => {
  // Estilo para el contenedor de fondo con desenfoque
  const backgroundStyle = {
    backgroundImage: `url(${image_farm})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Cubre la altura completa de la pantalla
    filter: 'blur(10px)', // Aplica el filtro de desenfoque directamente a la imagen
  };

  return (
    <div className="relative min-h-screen "> {/* Establece la posición relativa para el contenedor principal */}
      <div className="absolute overflow-hidden inset-0" style={backgroundStyle}></div> {/* Capa de fondo con desenfoque */}
      <div className="absolute overflow-hidden inset-0 bg-black bg-opacity-40"></div> {/* Capa de opacidad */}
      <div className="relative">
        <Welcome_Factory />
        <Meme_Search />
        <Footer />
      </div>
    </div>
  );
};

export default Factory;
