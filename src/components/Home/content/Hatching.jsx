import React from "react";
//import meme_video from "../../../../videos/meme_video.mp4";
import frame from "../../../../images/frame_4.png";

const Hatching = () => {
  return (
    <div className="flex flex-row items-center justify-around min-h-screen bg-gradient-to-r from-transparent to-transparent backdrop-blur-md"> 
      {/* Video Section on the left */}
      <div className="flex w-3/5 justify-center items-center">
        <div className="flex relative">
          <img src={frame} alt="Frame" className="absolute inset-0 w-full h-auto z-2 scale-150" />
          {/*<video controls width="100%" className=" z-1 py-3"> 
            <source src={meme_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>*/}
        </div>
      </div>
      {/* About Us Section on the right */}
    </div>
  );
};

export default Hatching;
