import  { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    color: string;
}

const PRODUCTS_URL = 'https://64ad67d8b470006a5ec5e9b1.mockapi.io/api/products/products';

const ColorButton = ({ color, onClick }: { color: string; onClick: () => void }) => (
    <button onClick={onClick} style={{ backgroundColor: color }}>
        {color}
    </button>
);

const ProductCard = ({ product }: { product: Product }) => (
    <div>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
    </div>
);

const CalcPc = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    useEffect(() => {
        axios.get<Product[]>(PRODUCTS_URL).then((response) => {
            setProducts(response.data);
        });
    }, []);

    const handleColorButtonClick = (color: string) => {
        setSelectedColor(color);
    };

    const filteredProducts = selectedColor
        ? products.filter((product) => product.color === selectedColor)
        : products;

    return (
        <div>
            Выбор товара по цвету
            <div>
                <ColorButton color="purple" onClick={() => handleColorButtonClick('purple')} />
                <ColorButton color="turquoise" onClick={() => handleColorButtonClick('turquoise')} />
                <ColorButton color="teal" onClick={() => handleColorButtonClick('teal')} />
                <ColorButton color="salmon" onClick={() => handleColorButtonClick('salmon')} />
                <ColorButton color="tan" onClick={() => handleColorButtonClick('tan')} />
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