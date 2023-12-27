import React from 'react';
import { Link } from 'react-router-dom';
import './Exercise.css';

function Exercise({ index, image }) {
    return (
        <Link to={`/exercises/${image.id}`}>
            <div key={index} className="image-container">
                <img src={image.gifUrl} alt={`Imagem ${index}`} className="image"/>
                <span className="image-name">{image.name}</span>
            </div>
        </Link>
    );
}

export default Exercise;
