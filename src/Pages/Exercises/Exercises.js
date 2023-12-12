import React, { useEffect, useState } from 'react';
import SelectBox from '../../Components/SelectBox/SelectBox';
import SearchBox from '../../Components/SearchBox/SearchBox';
import Exercise from '../../Components/Exercise/Exercise';
import ItemSlide from '../../Components/ItemSlide/ItemSlide';
import './Exercises.css';

function Exercises() {
    const [data, setData] = useState([]);
    const [dataOriginal, setDataOriginal] = useState([]);
    const [dataEquipments, setDataEquipments] = useState([]);
    const [dataBodyPart, setDataBodyPart] = useState([]);
    const [visibleImages, setVisibleImages] = useState(40);
    const [isLoading, setIsLoading] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [equipmentsText, setEquipmentsText] = useState({ value: "" });
    const [bodyPartText, setBodyPartText] = useState({ value: "" });

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                setIsLoading(true);
                let response = await fetch(url);
                let dataJson = await response.json();
                return dataJson;
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchDataExercises = async () => {
            setIsLoading(true);
            let dataJson = await fetchData('./serverJson/all.json');

            let dataUpperCase = dataJson.map((item) => ({
                ...item,
                name: item.name.replace(/(?:^|\s)\S/g, char => char.toUpperCase())
            }));

            setData(dataUpperCase);
            setDataOriginal(dataUpperCase);

            setIsLoading(false);
        };

        const fetchDataEquipments = async () => {
            setIsLoading(true);
            let dataJson = await fetchData('./serverJson/equipments.json');
            let convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "equipments"
            }));

            setDataEquipments(convertedOptions);
            setIsLoading(false);
        };

        const fetchDataBodyPart = async () => {
            setIsLoading(true);
            let dataJson = await fetchData('./serverJson/bodyPart.json');
            let convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "bodyPart"
            }));

            setDataBodyPart(convertedOptions);
            setIsLoading(false);
        };

        fetchDataExercises();
        fetchDataEquipments();
        fetchDataBodyPart();
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const totalHeight = document.documentElement.offsetHeight;
        const nearBottom = scrollPosition + 200 >= totalHeight;

        if (nearBottom && !isLoading) {
            console.log('Carregar mais imagens...');
            setIsLoading(true);
            setVisibleImages(prevVisibleImages => prevVisibleImages + 40);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const debouncedHandleScroll = debounce(handleScroll, 300);

        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, [isLoading]);

    useEffect(() => {
        filterData();
    }, [searchText, equipmentsText, bodyPartText]);

    const debounce = (func, delay) => {
        let timeoutId;
        return function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, arguments), delay);
        };
    };

    const handleSelectChange = (selectedOption) => {
        debugger;
        if (selectedOption !== null) {
            if (selectedOption.clean !== undefined) {
                if(selectedOption.clean === "Equipments") {
                    setEquipmentsText({ value: "" });
                }
                else {
                    setBodyPartText({ value: "" });
                }
            } else {
                if (selectedOption.type === "equipments") {
                    setEquipmentsText(selectedOption);
                }
                else {
                    setBodyPartText(selectedOption);
                }
            }
        }
    };

    const handleSearchBoxChange = (searchText) => {
        setSearchText(searchText);
    };

    const filterData = () => {
        let filteredDataSearchBox = dataOriginal.filter((item) => {
            const matchName = item.name.toLowerCase().includes(searchText.toLowerCase());
            const matchEquipment = item.equipment.toLowerCase().includes(searchText.toLowerCase());
            const matchBodyPart = item.bodyPart.toLowerCase().includes(searchText.toLowerCase());

            return matchName || matchEquipment || matchBodyPart;
        });

        let filteredDataSearchBoxAndEquipments;
        if (equipmentsText.value === "") {
            filteredDataSearchBoxAndEquipments = filteredDataSearchBox;

        } else {
            filteredDataSearchBoxAndEquipments = filteredDataSearchBox.filter(item => item.equipment.toLowerCase() === equipmentsText.value);
        }

        let filteredDataSearchBoxAndEquipmentsAndBodyPart;
        if (bodyPartText.value === "") {
            filteredDataSearchBoxAndEquipmentsAndBodyPart = filteredDataSearchBoxAndEquipments;

        } else {
            filteredDataSearchBoxAndEquipmentsAndBodyPart = filteredDataSearchBoxAndEquipments.filter(item => item.bodyPart.toLowerCase() === bodyPartText.value);
        }

        setData(filteredDataSearchBoxAndEquipmentsAndBodyPart);
    };

    return (
        <>
            <div className='Row'>
                <span className='Title'>Exercises</span>
                <div className='SearchBox'>
                    <SearchBox onSearch={handleSearchBoxChange} />
                </div>
                <div className='SelectBox1'>
                    <SelectBox label="Equipments" options={dataEquipments} onSelectChange={handleSelectChange} />
                </div>
                <div className='SelectBox2'>
                    <SelectBox label="Body Parts" options={dataBodyPart} onSelectChange={handleSelectChange} />
                </div>
            </div>
            <div className='Images'>
                {data.slice(0, visibleImages).map((image, index) => (
                    <Exercise index={index} image={image} />
                ))}

                {isLoading ? (
                    Array.from({ length: 20 }, (_, index) => <ItemSlide key={index} />)
                ) : null}
            </div>
        </>
    );
}

export default Exercises;
