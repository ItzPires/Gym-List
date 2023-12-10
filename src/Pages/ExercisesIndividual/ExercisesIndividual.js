import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ExercisesIndividual.css';

function ExercisesIndividual() {
    const [exercise, setExercise] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                setIsLoading(true);
                const response = await fetch(url);
                const dataJson = await response.json();
                return dataJson;
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        // temp
        const findExerciseById = (data, targetId) => {
            for (const item of data) {
                if (item.id === targetId) {
                    return item;
                }
            }
            return null;
        };

        const fetchDataExercise = async () => {
            setIsLoading(true);
            const dataJson = await fetchData(process.env.PUBLIC_URL + '/serverJson/all.json');
            const foundExercise = findExerciseById(dataJson, id);

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
                        <img src={process.env.PUBLIC_URL + '/images/gif.gif'} alt={'Imagem'} className='gif-individual'/>
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
