import React, { useState } from "react";
//import copy_logo from "../../../../images/copy.svg";
import golden_egg from "../../../../images/golden_egg.png"; // Suponiendo que tienes una imagen de un huevo dorado
import story_icon from "../../../../images/story_icon.png"; // Suponiendo que tienes un icono para la historia
import lesson_icon from "../../../../images/lesson_icon.png"; // Suponiendo que tienes un icono para la lección
import meme_icon from "../../../../images/meme_icon.png"; // Suponiendo que tienes un icono para el meme

const Token_Info = () => {
  const [contractAddress] = useState('CcxreSMUycHVRGUxbSTMrPG9GgRiZ9A8pKFzn6G6YAM2');

  const copyContractAddress = () => {
    navigator.clipboard.writeText(contractAddress);
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen p-10 space-y-10 bg-gradient-to-r from-transparent to-transparent backdrop-blur-md">

      {/* Title Section */}
      <div className="flex flex-col items-center">
        <img src={golden_egg} alt="Golden Egg" className="w-24 h-24 mb-4" />
        <h1 className="text-5xl text-center font-goldeng text-white font-extrabold">An Immortal Meme</h1>
        <h2 className="text-3xl font-goldeng text-white">(GG)</h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">

        {/* Card 1: The Myth */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-2xl text-center space-y-4 transform transition-all duration-500 hover:scale-105">
          <img src={story_icon} alt="Story Icon" className="w-16 h-16 mx-auto" />
          <h3 className="text-2xl font-goldeng text-yellow-600">The Myth</h3>
          <p className="text-gray-700 font-goldeng">
            The myth of the golden goose that laid golden eggs is often considered the oldest meme in human history, an immortal meme, if you will. This tale, which warns against greed and impatience, has been told and retold across cultures and generations.
          </p>
        </div>

        {/* Card 2: The Lesson */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-2xl text-center space-y-4 transform transition-all duration-500 hover:scale-105">
          <img src={lesson_icon} alt="Lesson Icon" className="w-16 h-16 mx-auto" />
          <h3 className="text-2xl text-yellow-600 font-goldeng">The Lesson</h3>
          <p className="text-gray-700 font-goldeng">
            The story's simplicity and universal message make it easily adaptable and relatable, much like a meme. Its core idea, the folly of killing a valuable resource for immediate gratification, is a timeless lesson that resonates with people of all ages and backgrounds.
          </p>
        </div>

        {/* Card 3: The Immortal Meme */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-2xl text-center space-y-4 transform transition-all duration-500 hover:scale-105">
          <img src={meme_icon} alt="Meme Icon" className="w-16 h-16 mx-auto" />
          <h3 className="text-2xl font-goldeng text-yellow-600">The Immortal Meme</h3>
          <p className="text-gray-700 font-goldeng">
            Just as memes spread and evolve in our digital age, this myth has been passed down, adapted, and kept alive throughout human history. It's a testament to the power of storytelling and the enduring nature of human wisdom. Thus, the golden goose truly is the immortal meme of human culture.
          </p>
        </div>
      </div>

      {/* Contract Address and Buy Button */}
      <div className="flex flex-col items-center space-y-6 w-full max-w-2xl">
  <a
    className="text-lg font-goldeng md:text-xl lg:text-2xl font-bold text-white transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-yellow-500 to-red-600 hover:from-red-600 hover:to-orange-500 py-10 px-10 md:py-8 md:px-28 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    href="https://aerodrome.finance/swap?from=0x4200000000000000000000000000000000000006&to=eth"
    target="_blank"
    rel="noopener noreferrer"
  >
    Buy GG
  </a>
</div>

    </div>
  );
};

export default Token_Info;
