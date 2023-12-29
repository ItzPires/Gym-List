import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UseFetch } from '../../Services/APIService';
import './ExercisesIndividual.css';

function ExercisesIndividual() {
    const [exercise, setExercise] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchDataExercise = async () => {
            setIsLoading(true);

            const foundExercise = await UseFetch('exercises/exercise/' + id);
            setExercise(foundExercise);

            setIsLoading(false);
        };

        fetchDataExercise();
    }, []);

    return (
        <>
            {exercise ? (
                <div className='context'>
                    <div className='image-individual'>
                        <img src={exercise.gifUrl} alt={'Imagem'} className='gif-individual' />
                    </div>
                    <div className='text'>
                        <span className="exercise-name">{exercise.name}</span>
                        <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                        <p><strong>Equipment:</strong> {exercise.equipment}</p>
                        <p><strong>Target:</strong> {exercise.target}</p>
                        {exercise.secondaryMuscles && (
                            <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles.join(', ')}</p>
                        )}
                        <h2>Instructions:</h2>
                        {exercise.instructions ? (
                            <ul>
                                {exercise.instructions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhuma instrução disponível</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="image-individual">Exercício não encontrado</p>
            )}
        </>
    );
}

export default ExercisesIndividual;
