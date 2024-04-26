import React from "react";
import sky from "../../../../images/sky.jpeg";
import meme_video from "../../../../videos/meme_video.mp4";

const Hatching = () => {
  const backgroundStyle = {
    backgroundImage: `url(${sky})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={backgroundStyle} className="flex flex-row items-center justify-around min-h-screen p-10"> 
      {/* Video Section on the left */}
      <div className="w-1/2">
        <video controls width="100%">
          <source src={meme_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* About Us Section on the right */}

    </div>
  );
};

export default Hatching;
