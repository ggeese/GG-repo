import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Model = React.memo(({ path, scale = 1 }) => {
  const { scene } = useGLTF(path);
  const meshRef = useRef();

  // Modificar materiales si es necesario
  scene.traverse((child) => {
    if (child.isMesh) {
      // Recalcular las normales
      child.geometry.computeVertexNormals();
    }
  });

  // Hacer que el modelo gire lentamente
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.00073; // Ajusta la velocidad de rotación aquí
    }
  });

  return <primitive ref={meshRef} object={scene} scale={scale} position={[0, 3.7, 0]} />;
});

export default Model;
