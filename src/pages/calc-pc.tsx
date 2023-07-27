import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    color: string;
    gender: string;
}

const PRODUCTS_URL = 'https://64ad67d8b470006a5ec5e9b1.mockapi.io/api/products/products';

const ProductCard = ({ product }: { product: Product }) => (
    <div>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
    </div>
);

const CalcPc = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
    const [selectedGenderIndex, setSelectedGenderIndex] = useState<number | null>(null);

    useEffect(() => {
        axios.get<Product[]>(PRODUCTS_URL).then((response) => {
            setProducts(response.data);
        });
    }, []);

    const handleColorSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setSelectedColorIndex(newValue);
        }
    };

    const handleGenderSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setSelectedGenderIndex(newValue);
        }
    };

    // Только те цвета, которые были в исходном коде
    const availableColors = ['grey', 'turquoise', 'teal', 'salmon', 'tan'];
    const colorMarks = availableColors.map((color, index) => ({ value: index, label: color }));

    const availableGenders = [
        'Cis male',
        'T* woman',
        'Cis man',
        'T* man',
        'FTM',
    ];
    const genderMarks = availableGenders.map((gender, index) => ({ value: index, label: gender }));

    const selectedColor = selectedColorIndex !== null ? availableColors[selectedColorIndex] : null;
    const selectedGender = selectedGenderIndex !== null ? availableGenders[selectedGenderIndex] : null;

    const filteredProducts = products.filter(
        (product) =>
            (selectedColor ? product.color === selectedColor : true) &&
            (selectedGender ? product.gender === selectedGender : true)
    );

    return (
        <div>
            Выбор товара по цвету
            <div>
                <Slider
                    defaultValue={0}
                    value={selectedColorIndex !== null ? selectedColorIndex : 0}
                    onChange={handleColorSliderChange}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    min={0}
                    max={availableColors.length - 1}
                    marks={colorMarks}
                    valueLabelDisplay="on"
                />
            </div>
            <div>
                Выбор товара по гендеру
                <div>
                    <Slider
                        defaultValue={0}
                        value={selectedGenderIndex !== null ? selectedGenderIndex : 0}
                        onChange={handleGenderSliderChange}
                        aria-labelledby="discrete-slider-custom"
                        step={1}
                        min={0}
                        max={availableGenders.length - 1}
                        marks={genderMarks}
                        valueLabelDisplay="on"
                    />
                </div>
            </div>
            <div>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>Не найдено</p>
                )}
            </div>
        </div>
    );
};

export default CalcPc;
