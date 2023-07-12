import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        price: 9.99,
        image: `/src/assets/VideoCard.jpg`,
    },
    {
        id: 2,
        name: 'Product 2',
        price: 19.99,
        image: `/src/assets/VideoCard.jpg`,
    },
    {
        id: 3,
        name: 'Product 3',
        price: 29.99,
        image: `/src/assets/VideoCard.jpg`,
    },
    {
        id: 4,
        name: 'Product 4',
        price: 29.99,
        image: `/src/assets/VideoCard.jpg`,
    },
    {
        id: 5,
        name: 'Product 5',
        price: 29.99,
        image: `/src/assets/VideoCard.jpg`,
    },
    {
        id: 6,
        name: 'Product 6',
        price: 29.99,
        image: `/src/assets/VideoCard.jpg`,
    },
    {
        id: 7,
        name: 'Product 7',
        price: 29.99,
        image: `/src/assets/VideoCard.jpg`,
    },
    {
        id: 8,
        name: 'Product 8',
        price: 29.99,
        image: `/src/assets/VideoCard.jpg`,
    },
];

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  width: 90rem;
`;

const ProductCard = styled(Link)`
  width: 21.5rem;
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
    return (
        <ProductsContainer>
            {products.map((product) => (
                <ProductCardComponent key={product.id} product={product} />
            ))}
        </ProductsContainer>
    );
}

export default ProductsPage;