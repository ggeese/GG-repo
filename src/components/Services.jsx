import React from "react";

const ServiceCard =  ({ title, description, imageUrl }) => {
  return (
    <div className="border border-gray-200 p-4 flex flex-col items-center text-center space-y-2">
      <img src={imageUrl} alt="" className="max-w-full h-auto rounded-md" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
