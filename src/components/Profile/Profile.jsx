import React from "react";
import farm2 from "../../../images/farm2.jpeg"; 

const Profile = () => {
  // Estableciendo el estilo de fondo con la imagen farm2
  const backgroundStyle = {
    backgroundImage: `url(${farm2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(7px)',
    minHeight: '100vh',
  };

  // Ejemplo de datos de usuario (puedes reemplazar estos con datos reales)
  const userProfile = {
    address: "0x1234...abcd",
    profileImage: "https://via.placeholder.com/150", // Imagen de perfil de muestra
    username: "User123",
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center"> {/* Centrar el contenido */}
      <div style={backgroundStyle} className="absolute inset-0"></div> {/* Capa de fondo con desenfoque */}
      <div className="relative z-1 bg-black bg-opacity-60 rounded-lg p-8 max-w-md mx-auto text-white shadow-lg"> {/* Capa de contenido */}
        <div className="flex flex-col items-center">
          {/* Icono de perfil */}
          <img
            src={userProfile.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white mb-4"
          />
          {/* Nombre de usuario */}
          <h2 className="text-2xl font-bold mb-2">{userProfile.username}</h2>
          {/* Dirección de la wallet */}
          <p className="text-lg">{userProfile.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
