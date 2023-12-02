import React, { useState } from 'react';
import './Exercise.css';

function Exercise({ index, image }) {
    return (
        <div key={index} className="image-container">
            <img src={process.env.PUBLIC_URL + '/images/gif.gif'} alt={`Imagem ${index}`} />
            <h1 className="image-name">{image.name}</h1>
        </div>
    );
}

export default Exercise;
