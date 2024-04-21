import React from "react";
import sky from "../../../../images/sky.jpeg";

const FAQ = () => {
  const backgroundStyle = {
    backgroundImage: `url(${sky})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={backgroundStyle} className="flex flex-row items-center justify-around min-h-screen p-10"> 
      {/* About Us Section on the left */}
      <div className="border border-gray-200 p-4 flex flex-col items-center text-center space-y-2 w-1/2">
        <h1 className="text-2xl font-bold">FAQ</h1>
        {/* Add more details or elements as needed */}
      </div>
    </div>
  );
};

export default FAQ;
