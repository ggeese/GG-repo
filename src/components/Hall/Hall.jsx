import React from 'react';
import Body from './content/Body';

const Hall = () => {
    return (
        <div className="relative min-h-screen">
            <Body className="h-4/5" /> {/* Establece la altura del 80% del contenedor */}
        </div>
    );
}

export default Hall;
