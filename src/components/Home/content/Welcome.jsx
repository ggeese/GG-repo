import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
//import meme_video from "../../../../videos/meme_video.mp4";
import frame from "../../../../images/frame_4.png";
import g_coin from "../../../../images/gg_coin_2.png";
import wire from "../../../../images/wire.png";
import wire_broken from "../../../../images/wire_broken.png";
import wire_broken_2 from "../../../../images/wire_broken_2.png";
import youtube from "../../../../images/youtube-icon.svg";
import telegram from "../../../../images/telegram.svg";
import discord from "../../../../images/discord.svg";
import twitter from "../../../../images/twitter.svg";

const Welcome = () => {
  const [showVideo, setshowVideo] = useState(false);
  const [hideSquare, setHideSquare] = useState(true);
  const [showFall, setshowFall] = useState(false);
  const [showBird, setshowBird] = useState(false);  
  const videoRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [showWire, setshowWire] = useState(false);  
  const [showWire2, setshowWire2] = useState(false);  
  const [showWire3, setshowWire3] = useState(false);  
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  // Bloquear y desbloquear el scroll según isClicked
  useEffect(() => {
    if (!isClicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, [isClicked]);


  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      const timerbird = setTimeout(() => {
        setShowBird(true);
      }, 5000);
      return () => clearTimeout(timerbird);
    }
  }, [isSmallScreen]);
  
  
  useEffect(() => {
    const timerwire_hide = setTimeout(() => {
      setshowWire2(false);
      setshowWire(false);
    }, 8000);
    return () => clearTimeout(timerwire_hide);
  }, []);

  useEffect(() => {
    const timerwire_2 = setTimeout(() => {
      setshowWire2(true);
    }, 8000);
    return () => clearTimeout(timerwire_2);
  }, []);

  useEffect(() => {
    const timerwire = setTimeout(() => {
      setshowWire(true);
    }, 5000);
    return () => clearTimeout(timerwire);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

const handleClick = () => {

  setIsClicked(true);
};

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHideSquare(false);
    }, 3000); // Desaparecer después de 5 segundos

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timervideo = setTimeout(() => {
      setshowVideo(true);
    }, 3000);

    return () => clearTimeout(timervideo);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideo]);

  useEffect(() => {
    const timerfall = setTimeout(() => {
      setshowFall(true);
      setshowWire2(false);
      setshowWire3(true);
    }, 35000);
    return () => clearTimeout(timerfall);
  }, []);

  useEffect(() => {
    const linkTimer = setTimeout(() => {
      setIsClicked(true);
    }, 39000);
    return () => clearTimeout(linkTimer);
  }, []);

  useEffect(() => {
    const timerbird = setTimeout(() => {
      setshowBird(true);
    }, 5000);
    return () => clearTimeout(timerbird);
  }, []);

  return (
    
    <div className="relative w-full h-screen">
      {!isClicked && (
        <>
          {/* Animaciones y video */}
          
          <div>
          <div className={`absolute inset-0 flex items-center justify-center z-10 h-auto left-4 top-40 ${showWire3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className=" -translate-y-1/3 mt-16">
              <img src={wire_broken_2} alt="wire_broken" className=" h-auto z-2 scale-100"/>
            </div>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center z-10 h-auto left-4 top-40 ${showWire2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className=" -translate-y-1/3 mt-16">
              <img src={wire_broken} alt="wire_broken" className=" h-auto z-2 scale-100"/>
            </div>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center z-10 h-auto left-4 top-40 ${showWire ? 'opacity-100' : 'opacity-0'}`}>
            <div className=" -translate-y-1/3 mt-16">
              <img src={wire} alt="wire" className=" h-auto z-2 scale-100"/>
            </div>
          </div>
          {!isSmallScreen && (
              <div className={`fixed inset-0 flex items-center justify-center z-10 ${hideSquare ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}`}>
                <div className="relative transform -translate-y-1/3 mt-40">
                  <div className="animatedSquare">
                    {/* Contenido de la animación animatedSquare */}
                  </div>
                </div>
              </div>
            )}

            {!isSmallScreen && (

          <div className={`absolute inset-0 flex z-1 top-1/5 scale-50`}>
           {<div className={`${showBird ? 'move-diagonal-animation' : 'opacity-0'}`}>
              <div className="">
                <div className="animatedBird">
                </div>
              </div>
            </div>}
          </div>
            )}
          <div className={`absolute inset-0 flex items-center justify-center overflow-hidden ${showVideo ? 'opacity-100 z-20' : 'opacity-0'}`}>
          <div className={`${!isSmallScreen && showFall ? 'fall-animation' : ''}`}>
              <div className="relative w-full max-w-[850px] md:right-[-60px] md:top-[-35px] right-0 top-0 md:px-0">
                <img src={frame} alt="Frame" className="absolute inset-0 w-full h-auto z-2 scale-150" />
                {/*<video ref={videoRef} muted controls className="w-full z-1 py-3">
                  <source src={meme_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>*/}
                {<div  >
                  <iframe
                  className={`${!isSmallScreen? 'w-[640px] h-[500px] pt-[2%] pb-[20%]' : 'w-full'}`}
                  src="https://www.youtube.com/embed/K63c6pANvOM?autoplay=1&mute=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="GoldenG"
              ></iframe>
              </div>
              }
              </div>
            </div>
          </div>
          </div>
        </>
      )}
      {isClicked && (
        <div>
          <div className="fixed right-0 flex flex-col p-2 gap-2 sm:flex-row sm:p-4">
            <a
              href="https://www.youtube.com/watch?v=K63c6pANvOM"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-yellow-200 text-white font-bold p-3 sm:p-4 rounded sm:rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-500 hover:scale-105"
            >
              <img src={youtube} alt="Youtube" className="w-6 sm:w-8" />
            </a>
            <a
              href="https://discord.gg/EU4zbgS8cU"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-yellow-200 text-white font-bold p-3 sm:p-4 rounded sm:rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-500 hover:scale-105"
            >
              <img src={discord} alt="Discord" className="w-6 sm:w-8" />
            </a>

            <a
              href="https://t.me/+ChPfId2jYWMyNzVh"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-yellow-200 text-white font-bold p-3 sm:p-4 rounded sm:rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-500 hover:scale-105"
            >
              <img src={telegram} alt="Telegram" className="w-6 sm:w-8" />
            </a>

            <a
              href="https://x.com/GeesesGolden"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-yellow-200 font-bold p-3 sm:p-4 rounded sm:rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-500 hover:scale-105"
            >
              <img src={twitter} alt="Twitter" className="w-6 sm:w-8" />
            </a>
          </div>
          <div className="flex flex-col items-center justify-around min-h-screen p-5">
            <div className="w-full text-center mt-10 sm:mt-10 md:mt-0 lg:mt-0">
              <h1 className="md:text-7xl sm:text-5xl lg:text-9xl text-5xl font-goldeng text-center text-black transition-opacity duration-500 opacity-100">
                <span className="block md:inline">GOL</span>
                <span className="block md:inline">DEN</span>              
              </h1>
              <h1 className="md:text-7xl sm:text-5xl lg:text-9xl text-5xl font-goldeng text-center text-black transition-opacity duration-500 opacity-100">
                GE
                <img src={g_coin} alt="Goose" className="inline-block  md:w-20 sm:w-10 lg:w-40 w-10 align-middle" />
                SE
              </h1>
            </div>
            <div className="flex flex-col justify-center md:flex-row items-center  text-4xl lg:text-7xl md:text-5xl sm:text-3xl gap-4 md:gap-4 lg:gap-40 px-5 py-5 z-20">
              <Link to="/Factory" className="flex font-goldeng justify-center text-center flex-col m-4 py-10 px-10 bg-white bg-opacity-50 rounded-3xl shadow-md transition-opacity duration-500 z-20 transform transition-all duration-500 hover:scale-105">
                <p>Memes </p>
                <p>Factory</p>
              </Link>
              <Link to="/Farm" className="flex font-goldeng justify-center text-center flex-col m-4 py-10 px-12 bg-white bg-opacity-50 rounded-3xl shadow-md transition-opacity duration-500 z-20 transform transition-all duration-500 hover:scale-105">
                <p>Staking</p>
                <p>Memes</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Welcome;
