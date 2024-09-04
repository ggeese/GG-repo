import React from "react";
import g_coin from "../../../images/gg_coin_2.png";
import { FaReact } from "react-icons/fa"; // Icono de React, si prefieres usar iconos en lugar de SVG
import loading from "../../../images/bg_1.jpg";

const Loading = () => {
  return (
    <div 
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${loading})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-xl text-white flex flex-col items-center">
        <div className="w-64 h-64 rounded-full p-2 mb-8 bg-gradient-to-r from-blue-500 to-teal-500">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img
              src={g_coin}
              alt="Main Character"
              className="object-cover object-center w-full h-full transform scale-105"
            />
          </div>
        </div>

        <h1 className="text-3xl text-black font-bold mb-4">Loading GG</h1>

        <div className="flex items-center space-x-2">
          <FaReact className="w-8 h-8 text-blue-400 animate-spin" />
          <FaReact className="w-8 h-8 text-blue-400 animate-spin delay-100" />
          <FaReact className="w-8 h-8 text-blue-400 animate-spin delay-200" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
