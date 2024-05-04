import React from 'react';
import Body from './content/Body';

const Points = () => {
    return (
        <div className="relative min-h-screen">
            <Body className="h-4/5" /> {/* Establece la altura del 80% del contenedor */}
        </div>
    );
}

export default Points;
