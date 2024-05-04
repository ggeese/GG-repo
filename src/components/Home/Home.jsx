import React from 'react';
import Welcome from './content/Welcome';
import Info from './content/Info';
import Token_Info from './content/Token_Info';
import Hatching from './content/Hatching';
import FAQ from './content/FAQ';
import goose_static from "../../../images/goose_static.png"; 
import bg_1 from "../../../images/bg_1.jpg"; 
import bg_1_1 from "../../../images/bg_1_1.png"; 
import bg_2 from "../../../images/bg_2.jpg"; 
import bg_3 from "../../../images/bg_3.jpg"; 
import bg_4 from "../../../images/bg_4.jpg";
import bg_5 from "../../../images/bg_5.jpg"; 


const Home = () => {
  return (
    <div>
      {/* Sección Welcome con fondo bg_1 */}
      <div className="min-h-screen bg-black relative">
  {/* Primer fondo */}
  <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg_1})` }}></div>
  
  {/* Segundo fondo */}
  <div className="absolute inset-0 z-10 bg-cover bg-center" style={{ backgroundImage: `url(${bg_1_1})` }}></div>
        {/* Contenido de las animaciones */}
        <div className="absolute top-1/4 z-2">
            <div className="move-right-animation inline-block">
              <div className="">
                <div className="animatedSprite">
                  {/* Contenido de las animaciones */}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-20 top-1/3 z-2 scale-90">
            <div className="move-left-animation inline-block">
              <div className="scale-90">
                <div className="animatedSprite">
                  {/* Contenido de las animaciones */}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 right-0 z-2">
            <div className="move-left-animation inline-block">
              <div className="scale-50">
               <div className="animatedSprite">
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 mt-20 left-5 z-2">
            <div className="move-right-animation inline-block">
              <div className="scale-75">
               <div className="animatedSprite">
                </div>
              </div>
            </div>
          </div> 

          




        {/* Contenido de la sección Welcome */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Welcome/>
        </div>
    </div>



      {/* Sección Token_Info con fondo bg_2 */}
      <div className="min-h-screen" style={{ backgroundImage: `url(${bg_2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Token_Info/>
      </div>
      {/* Sección Info con fondo bg_3 */}
      <div className="min-h-screen" style={{ backgroundImage: `url(${bg_3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Info/>
      </div>
      {/* Sección Hatching con fondo bg_4 */}
      <div className="min-h-screen" style={{ backgroundImage: `url(${bg_4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Hatching/>
      </div>
      {/* Sección FAQ con fondo bg_5 */}
      <div className="min-h-screen" style={{ backgroundImage: `url(${bg_5})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <FAQ/>
      </div>
      {/* Imagen fija en la esquina inferior derecha */}
      <div className="fixed bottom-0 right-0 z-20 pointer-events-none">
  <img
    src={goose_static}
    alt="Goose"
    className="w-40 h-auto sm:w-44 md:w-52 lg:w-72 xl:w-80 object-cover" // Ajusta el tamaño de la imagen según sea necesario
  />
</div>
    </div>
  );
}

export default Home;
