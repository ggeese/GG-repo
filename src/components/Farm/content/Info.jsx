// StakingPool.js

import React from 'react';

const Info = () => {
  return (
    <div className=" flex flex-col items-center bg-gray-200 text-white p-4">
      <div className="text-black text-3xl font-bold mb-6">
        Staking Pool
      </div>
      <div className="text-xl mb-6">
        Stake MEME tokens to Earn $GULL
      </div>
      <div className="w-full max-w-2xl p-4 border border-gray-700 rounded-lg shadow-lg">
        <div className="text-center text-2xl mb-4">
          Total Value Locked
        </div>
        <div className="text-center text-5xl font-bold">
          $4,736,563
        </div>
      </div>
    </div>
  );
};

export default Info;
