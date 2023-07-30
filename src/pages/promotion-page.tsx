import { useEffect, useRef, useState } from "react";
import ProductCardComponent, { Product } from "../components/card.tsx";
import styled from "styled-components";

export default function PromotionPage() {
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
                const sortedData =
                    sortOrder === "asc"
                        ? data.sort((a, b) => a.price - b.price)
                        : data.sort((a, b) => b.price - a.price);
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
        <PromotionPageWrapper>
            <SortButton onClick={handleSortClick}>
                Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
            </SortButton>
            <ProductsContainer ref={containerRef}>
                {products
                    .filter((product) => parseFloat(String(product.price)) < 400) // Filter products with price less than 400
                    .map((product) => (
                        <ProductCardWrapper key={product.id}>
                            <ProductCardComponent product={product} />
                            {parseFloat(String(product.price)) < 400 && <DiscountTag>скидка</DiscountTag>}
                        </ProductCardWrapper>
                    ))}
                {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
            </ProductsContainer>
        </PromotionPageWrapper>
    );
}

const PromotionPageWrapper = styled.div`

`

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  gap: 1rem;
`;

const ProductCardWrapper = styled.div`
  position: relative;
`;

const DiscountTag = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  color: white;
  padding: 0.2rem 0.5rem;
  font-size: 12px;
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

  @media(max-width: 348px) {
    font-size: 10px;
  }
`;
