import React from 'react';
import Services from './Services';

const GridContainer = () => {
  const items = [
    { title: 'Título 1', description: 'Descripción breve 1', imageUrl: 'https://placekitten.com/200/300' },
    { title: 'Título 2', description: 'Descripción breve 2', imageUrl: 'https://placekitten.com/200/301' },
    { title: 'Título 3', description: 'Descripción breve 3', imageUrl: 'https://placekitten.com/200/302' },
    { title: 'Título 4', description: 'Descripción breve 4', imageUrl: 'https://placekitten.com/200/303' },
    { title: 'Título 5', description: 'Descripción breve 5', imageUrl: 'https://placekitten.com/200/304' },
    { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305' },
    { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305' },
    { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305' },
    { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305' },
    { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305' },
    { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305' },


  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Services key={index} {...item} />
      ))}
    </div>
  );
};

export default GridContainer;
