import React from 'react';
import ThxWidget from './ThxWidget';

const Body = () => {
    return (
        <div style={{ height: 'calc(70vh)' }}> {/* Ajusta la altura del div para ocupar el 100% del viewport menos 100px */}
            <div style={{ height: '100%' }}> {/* Utiliza un div interno para establecer la altura */}
                {/* Utiliza un iframe para mostrar la página web */}
                <iframe src="https://app.thx.network/c/662b2cc42a3c929262302ced/quests" title="Social Points" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
            </div>
            <ThxWidget />
        </div>
    );
};

export default Body;
