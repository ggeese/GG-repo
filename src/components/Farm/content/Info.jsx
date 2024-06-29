import React from 'react';
import plank_1 from "../../../../images/plank_1.png"; // Importa la imagen
import plank_2 from "../../../../images/plank_2.png"; // Importa la imagen
import sign_wood from "../../../../images/sign_wood.png"; // Importa la imagen
import grass_4 from "../../../../images/grass_4.png"; // Importa la imagen


const Info = () => {
  return (
    <div className="flex flex-col items-center text-black relative">
      <div className="flex flex-col items-center"> 
        <div className=" flex flex-fil mt-20">

          <div className= "flex px-10"style={{backgroundImage: `url(${plank_1})`, backgroundSize: 'auto 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className="hidden md:block flex flex-fil text-sm px-16">
            </div>
              <div className="flex flex-col text-black text-5xl font-bold mt-10 mb-10" >
                <p className="flex flex-col justtify-center items-center">Staking</p>
                <p className="flex flex-col justtify-center items-center">Pools</p>
            </div>
            <div className="hidden md:block flex flex-fil text-sm px-16">
              </div>
              <div className="flex text-sm">
              </div>
          </div>
        </div>


        <div className="flex flex-fil">
          <div className="hidden md:block flex flex-col px-10" style={{backgroundImage: `url(${sign_wood})`, backgroundSize: 'auto 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <p className="flex text-xl flex-col">
            </p >
            <p className="flex text-xl flex-col mt-8">
                Stake $GOOSE
            </p >
            <p className="flex text-xl flex-col mt-7">
                Earn Memes
            </p >

            <p className="flex flex-col p-16">
            </p>
          </div>


          <div className="flex " style={{backgroundImage: `url(${plank_2})`, backgroundSize: 'auto 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className="hidden md:block flex flex-fil text-sm px-16">
            </div>
              <div className="w-full max-w-2xl p-4 rounded-lg  text-black shadow-lg mt-20">
                <div className="text-center text-2xl mb-4">
                  Total Value Locked
                </div>
                <div className="text-center text-5xl font-bold">
                  $4,736,563
                </div>
              </div>
              <div className="hidden md:block flex flex-fil text-sm px-16" >
            </div>
          </div>
          <div className="hidden md:block flex-col py-5 px-10" style={{backgroundImage: `url(${grass_4})`, backgroundSize: 'auto 80%', backgroundPosition: 'bottom', backgroundRepeat: "no-repeat"}}>

            <p className="flex text-xl flex-col py-8">
            </p >
            <p className="flex flex-col p-16" >
            </p>
          </div>
          </div>

      </div>

    </div>
    
  );
};

export default Info;
