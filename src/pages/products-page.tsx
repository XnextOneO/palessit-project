import {useEffect, useRef, useState} from "react";
import ProductCardComponent, {Product} from "../components/card.tsx";
import styled from "styled-components";

export default function ProductsPage() {
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

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  font-weight: bold;
`;