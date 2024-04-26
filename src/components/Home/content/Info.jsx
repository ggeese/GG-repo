import React from "react";
import sky from "../../../../images/sky.jpeg";
import meme from "../../../../images/meme.png";

const Info = () => {
  const backgroundStyle = {
    backgroundImage: `url(${sky})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={backgroundStyle} className="flex flex-row items-center justify-around min-h-screen p-10"> 
      {/* About Us Section on the left */}
      <div className="bg-white bg-opacity-50 border border-gray-200 p-4 flex flex-col items-center text-center space-y-2 w-1/2">
        <h1 className="text-2xl font-bold">What is Hatching?</h1>
        <p className="text-2xl">In Golden Goose Factory people create memes, everyone can create memes easily and quickly. With a couple of clicks and you created your meme, then you can stake with us in our Golden Goose incubator where golden eggs are also incubated, you can earn Golden Goose tokens by incubating your eggs in the staking, where the longer it is and The more people you hatch, the more rewards you receive.</p>
        {/* Add more details or elements as needed */}
      </div>

      {/* Meme Image Section on the right */}
      <div className="w-1/2 flex justify-center items-center">
        <img src={meme} alt="Meme" className="max-w-full h-auto rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Info;
