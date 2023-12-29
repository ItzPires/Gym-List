import React from 'react';
import { Link } from 'react-router-dom';
import './Exercise.css';

function Exercise({ index, image, onLoad }) {
    return (
        <Link to={`/exercises/${image.id}`}>
            <div key={index} className="image-container">
                <img src={image.gifUrl} alt={`Imagem ${index}`} className="image" onLoad={onLoad} />
                <span className="image-name">{image.name}</span>
            </div>
        </Link>
    );
}

export default Exercise;
