import React from "react";

const FAQ = () => {

  return (
    <div className="flex flex-row items-center justify-around min-h-screen p-10"> 
      {/* About Us Section on the left */}
      <div className="bg-white bg-opacity-50 border border-gray-200 p-4 flex flex-col items-left text-center shadow-lg space-y-2 w-1/2">
        <h1 className="text-2xl font-bold">FAQ</h1>
        <h1 className="text-left text-2xl px-4">
          Q : How to buy?
        </h1>
        <div className="flex flex-item">

            <h1 className="text-left text-2xl px-4">
            A : Cuak! Cuak! go there via
            </h1>
            <a className="text-left flex text-gray italic text-2xl px-4" href="https://birdeye.so/token/CcxreSMUycHVRGUxbSTMrPG9GgRiZ9A8pKFzn6G6YAM2/Hjjpt3M2koFkAvS39uyinYRRsqRWqPi1Vt5jjkJeKwNn?chain=solana" target="_blank" rel="noopener noreferrer">here</a>
            </div>

        <h1 className="text-left text-2xl px-4">
          Q : TAX?
        </h1>

        <h1 className="text-left text-2xl px-4">
          A : Cuack, we no, We have no Tax.
        </h1>

        <h1 className="text-left text-2xl px-4">
          Q : Presale?
        </h1>

        <h1 className="text-left text-2xl px-4">
          A : Cuak!! We no presale!!
        </h1>
        {/* Add more details or elements as needed */}
      </div>
    </div>
  );
};

export default FAQ;
