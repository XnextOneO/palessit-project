import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pageRef = useRef<number>(1);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetchProducts(pageRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProducts = (page: number) => {
        setIsLoading(true);
        fetch(`https://64ad67d8b470006a5ec5e9b1.mockapi.io/api/products/products?page=${page}&limit=8`)
            .then((response) => response.json())
            .then((data) => {
                setProducts((prevProducts) => [...prevProducts, ...data]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const handleScroll = () => {
        if (
            containerRef.current &&
            containerRef.current.getBoundingClientRect().bottom <= window.innerHeight
        ) {
            pageRef.current++;
            fetchProducts(pageRef.current);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ProductsContainer ref={containerRef}>
            {products.map((product) => (
                <ProductCardComponent key={product.id} product={product} />
            ))}
            {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
        </ProductsContainer>
    );
}

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  width: 83rem;

  @media (max-width: 1920px) {
    width: 82rem;
  }

  @media (max-width: 1301px) {
    width: 60rem;
  }

  @media (max-width: 817px) {
    width: 30rem;
  }

  @media (max-width: 478px) {
    width: 13rem;
  }
`;

const ProductCard = styled(Link)`
  height: 25rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  border-radius: 12px;

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

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  font-weight: bold;
`;
export default ProductsPage;
