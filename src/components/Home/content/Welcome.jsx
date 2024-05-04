import React from 'react';
import { Link } from 'react-router-dom';


const Welcome = () => {


  return (
    <div className="flex flex-col items-center justify-around min-h-screen p-10">

 {/* Uso de justify-between y padding en el contenedor principal */}
      <div className="w-full text-center">
        <h1 className="text-9xl font-goldeng text-center text-black">
          Golden Goose
        </h1>
      </div>
      <div className="flex flex-col justify-center md:flex-row items-center gap-8 md:gap-4 lg:gap-8 px-5 py-20">
        <Link to="/Factory" className="flex justify-center text-center flex-col m-4 py-10 px-10 bg-white bg-opacity-50 rounded-3xl shadow-md text-7xl" >
          Meme Factory
        </Link>
        <Link to="/Farm" className="flex justify-center text-center flex-col m-4 py-10 px-10 bg-white bg-opacity-50 rounded-3xl shadow-md text-7xl" >
          Staking Meme
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
