import React, { useContext, useEffect, useState } from "react";
import farm2 from "../../../images/farm2.jpeg";
import { TransactionContext } from "../../context/TransactionContext";
import { TransactionContextETH } from "../../context/ContextETH/ContextETH";
import gg from "../../../images/goldeng.png";
const Profile = () => {
  const { currentAccount, DataUser } = useContext(TransactionContext);
  const { signatureSession } = useContext(TransactionContextETH);
  const [coinbaseBalance, setCoinbaseBalance] = useState([]); // Nuevo estado para el balance
  const [userProfile, setUserProfile] = useState(null);
  const [memes, setMemes] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(DataUser);
        setUserProfile(DataUser.user);
        setCoinbaseBalance(DataUser.BaseBalances || []); 
        setMemes(DataUser.memes || []);
        setComments(DataUser.comments || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    // Llama a getUserData solo si currentAccount es válido y no hay perfil cargado
    if (currentAccount && currentAccount.trim() !== "" && !userProfile) {
      getUserData();
    }
  }, [currentAccount, userProfile, signatureSession]);
  
  

  const backgroundStyle = {
    backgroundImage: `url(${farm2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(7px)',
    minHeight: '100vh',
  };

  return (
    <div className="relative min-h-screen">
      <div style={backgroundStyle} className="absolute inset-0"></div>
      <div className="relative z-10 bg-black bg-opacity-50 rounded-lg p-8 max-w-2xl mx-auto text-white shadow-2xl">
        {userProfile ? (
          <div className="flex flex-col items-center space-y-8">
            {/* Sección de Perfil */}
            <div className="text-center">
              <div className="relative">
                <img
                  src={userProfile.profileImage || gg}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-yellow-300 transition duration-300"></div>
              </div>
              <h2 className="text-3xl font-extrabold mt-4">{userProfile.username}</h2>
              <p className="text-sm bg-gray-800 bg-opacity-70 p-2 rounded-lg shadow-inner mt-2">{userProfile.walletAddress}</p>
            </div>

            {/* Sección de Memes Creados */}
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-4">Holdings on Base:</h3>
              <div className="space-y-2">
                {coinbaseBalance?.result?.balances && coinbaseBalance.result.balances.length > 0 ? (
                  coinbaseBalance.result.balances.map((balance, index) => (
                    <div key={index} className="bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-lg">
                      <p>Token: {balance.asset.groupId}</p>
                      <p>Balance: {(parseFloat(balance.valueStr) / Math.pow(10, balance.decimals)).toFixed(2)}</p>
                    </div>
                  ))
                ) : (
                  <p>No balances found.</p>
                )}
              </div>
            </div>


            {/* Feed de Comentarios */}
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-4">Feed</h3>
              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-lg">
                      <p className="text-sm">{comment.text}</p>
                      <p className="text-xs text-gray-400 mt-2 text-right">{comment.date}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Connect your wallet...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
