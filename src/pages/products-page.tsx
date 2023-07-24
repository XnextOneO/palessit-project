import { useEffect, useRef, useState } from "react";
import ProductCardComponent, { Product } from "../components/card.tsx";
import styled from "styled-components";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pageRef = useRef<number>(1);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        fetchProducts(pageRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProducts = (page: number) => {
        setIsLoading(true);
        fetch(
            `https://64ad67d8b470006a5ec5e9b1.mockapi.io/api/products/products?page=${page}&limit=8`
        )
            .then((response) => response.json())
            .then((data: Product[]) => {
                const sortedData = sortOrder === "asc" ? data.sort((a, b) => a.price - b.price) : data.sort((a, b) => b.price - a.price);
                setProducts((prevProducts) => [...prevProducts, ...sortedData]);
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
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSortClick = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        setProducts([]); // Очищаем список товаров, чтобы обновить его заново с новым порядком сортировки.
        pageRef.current = 1; // Сбрасываем номер страницы на первую.
        fetchProducts(1); // Загружаем товары с первой страницы, они уже будут отсортированы в соответствии с sortOrder.
    };

    return (
        <div>
            <SortButton onClick={handleSortClick}>
                Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
            </SortButton>
            <ProductsContainer ref={containerRef}>
                {products.map((product) => (
                    <ProductCardComponent key={product.id} product={product} />
                ))}
                {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
            </ProductsContainer>
        </div>
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

  @media (max-width: 1379px) {
    width: 60rem;
  }

  @media (max-width: 1101px) {
    width: 40rem;
  }

  @media (max-width: 705px) {
    width: 20rem;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  font-weight: bold;
`;

const SortButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;
