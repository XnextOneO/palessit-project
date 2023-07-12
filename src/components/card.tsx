import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  width: 80rem;
`;

const ProductCard = styled(Link)`
  
  height: 25rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.3);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 2rem;
`;

const ProductName = styled.h3`
  margin-top: 0;
`;

const ProductPrice = styled.p`
  margin-bottom: 0;
`;

function ProductCardComponent({ product }: { product: Product }): JSX.Element {
    return (
        <ProductCard to={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price}</ProductPrice>
            </ProductInfo>
        </ProductCard>
    );
}

function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://64ad67d8b470006a5ec5e9b1.mockapi.io/api/products/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <ProductsContainer>
            {products.map((product) => (
                <ProductCardComponent key={product.id} product={product} />
            ))}
        </ProductsContainer>
    );
}

export default ProductsPage;