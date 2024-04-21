


import React from "react";
import sky from "../../../../images/sky.jpeg";
import meme from "../../../../images/meme.png";

const Token_Info = () => {
  const backgroundStyle = {
    backgroundImage: `url(${sky})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={backgroundStyle} className="flex flex-col items-center justify-center min-h-screen p-10">
      {/* About Us Section */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-center space-y-4 w-full max-w-lg">
        <h1 className="text-3xl font-bold">Meme Info</h1>
        <p>Learn more about our team and mission. Explore how MEME makes everyone smile!</p>
      </div>

      {/* Contract Address */}
      <div className="bg-white bg-opacity-90 p-4 mt-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        <h2 className="text-xl font-semibold">Contract Address</h2>
        <p className="text-gray-800">0x123...abc</p> {/* Replace with actual contract address */}
      </div>

      {/* Button */}
      <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full max-w-xs">
        Buy MEME
      </button>
    </div>
  );
};

export default Token_Info;
