import React from 'react';
import sky from "../../../../images/sky.jpeg";
import { Link } from 'react-router-dom';

const Welcome = () => {
  const backgroundStyle = {
    backgroundImage: `url(${sky})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={backgroundStyle} className="flex flex-col items-center justify-around min-h-screen p-10"> {/* Uso de justify-between y padding en el contenedor principal */}
      <div className="w-full text-center">
        <h1 className="text-9xl font-goldeng text-black">
          Golden Goose
        </h1>
      </div>
      <div className="flex items-center ">
        <Link to="/Factory" className="m-4 p-8 bg-white bg-opacity-50 rounded-lg shadow-md text-4xl" >
          Meme Factory
        </Link>
        <Link to="/Farm" className="m-4 p-8 bg-white bg-opacity-50 rounded-lg shadow-md text-4xl" >
          Staking Meme
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
