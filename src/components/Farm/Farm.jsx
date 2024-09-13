import React from "react";
import { Info, Pools } from './content';
import farm2 from "../../../images/farm2.jpeg"; 
import bear from "../../../images/bg_footer.png"; 

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
    <div className="relative min-h-screen  overflow-hidden "> {/* Establece la posición relativa */}
      <div style={backgroundStyle} className="absolute inset-0"></div> {/* Capa de fondo con desenfoque */}
      <div className="relative z-10 bg-black bg-opacity-50"> {/* Capa de contenido con un z-index más alto para estar sobre el fondo */}
        <Info />
        <Pools />
      </div>
      
      {/* Imagen del oso sobre todo el contenido */}
      <div className="absolute bottom-0 inset-0 z-10 pointer-events-none"> {/* Cubre todo el contenido */}
        <img src={bear} alt="Bear Overlay" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Farm;
