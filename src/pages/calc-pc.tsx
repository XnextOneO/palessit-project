import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';

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
    <CalcCardWrapper>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
    </CalcCardWrapper>
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
        console.log(event);
        if (typeof newValue === 'number') {
            setSelectedColorIndex(newValue);
        }
    };

    const handleGenderSliderChange = (event: Event, newValue: number | number[]) => {
        console.log(event);
        if (typeof newValue === 'number') {
            setSelectedGenderIndex(newValue);
        }
    };

    // Только те цвета, которые были в исходном коде
    const availableColors = ['grey', 'turquoise', 'teal', 'salmon', 'tan'];
    const colorMarks = availableColors.map((color, index) => ({ value: index, label: color }));

    const availableGenders = ['Cis male', 'T* woman', 'Cis man', 'T* man', 'FTM'];
    const genderMarks = availableGenders.map((gender, index) => ({ value: index, label: gender }));

    const selectedColor = selectedColorIndex !== null ? availableColors[selectedColorIndex] : null;
    const selectedGender = selectedGenderIndex !== null ? availableGenders[selectedGenderIndex] : null;

    const filteredProducts = products.filter(
        (product) =>
            (selectedColor ? product.color === selectedColor : true) &&
            (selectedGender ? product.gender === selectedGender : true)
    );

    return (
        <CalcPcWrapper>
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
            <ProductList>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <NotFoundMessage>Не найдено</NotFoundMessage>
                )}
            </ProductList>
        </CalcPcWrapper>
    );
};

export default CalcPc;

const CalcPcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  width: 30rem;

  @media (max-width: 677px) {
    width: 15rem;
  }

  @media (max-width: 370px) {
    width: 8rem;
  }
`;

const ProductList = styled.div`
  display: flex;
  min-width: 600px;
  flex-direction: column;

`;

const NotFoundMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
`;

const CalcCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  img {
    width: 200px;
    height: 150px;
  }
  h3,
  p {
    width: 200px;
  }

  @media (max-width: 677px) {
    img {
      width: 100px;
      height: 75px;
    }
    h3,
    p {
      width: 100px;
    }
  }

  @media (max-width: 370px) {
    img {
      width: 50px;
      height: 35px;
    }
    h3,
    p {
      width: 50px;
    }
  }
`;
