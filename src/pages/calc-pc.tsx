import{ useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    color: string;
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

    // Только те цвета, которые были в исходном коде
    const availableColors = ['purple', 'turquoise', 'teal', 'salmon', 'tan'];
    const marks = availableColors.map((color, index) => ({ value: index, label: color }));

    const selectedColor = selectedColorIndex !== null ? availableColors[selectedColorIndex] : null;

    const filteredProducts = selectedColor
        ? products.filter((product) => product.color === selectedColor)
        : products;

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
                    marks={marks}
                    valueLabelDisplay="on"
                />
            </div>
            <div>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CalcPc;
