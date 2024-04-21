import React from "react";
import sky from "../../../../images/sky.jpeg";

const Hatching = () => {
  const backgroundStyle = {
    backgroundImage: `url(${sky})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={backgroundStyle} className="flex flex-row items-center justify-around min-h-screen p-10"> 
      {/* About Us Section on the left */}
      <div className="border border-gray-200 p-4 flex flex-col items-center text-center space-y-2 w-1/2">
        <h1 className="text-2xl font-bold">Welcome to Memecoins! Ready to laugh? You are in the perfect place! Here at Memecoins, we turn the art of creating memes into a laugh fest. Since [year], we bring to life the most witty occurrences on the internet. Our mission is simple: Make creating memes as easy as laughing at a cat playing the piano. Do you like fast and fun? Well, with our super-intuitive tools, even your grandmother could create the next viral meme of the moment. Come join the fun: Swipe through our image library, choose a catchy phrase, and bam! You're now ready to conquer everyone's meme feed. At Memecoins, every click is an opportunity for you to be the laughing hero in your group of friends. Create, share and make the world laugh with Memecoins!</h1>
        {/* Add more details or elements as needed */}
      </div>
    </div>
  );
};

export default Hatching;
