import {useState, useRef} from "react";
import ProductCardComponent, {Product} from "../components/card.tsx";
import styled from "styled-components";

export default function PromotionPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pageRef = useRef<number>(1);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const fetchProducts = (page: number, filterByPrice = false) => {
        setIsLoading(true);
        const url = `https://64ad67d8b470006a5ec5e9b1.mockapi.io/api/products/products?page=${page}&limit=8${
            filterByPrice ? "&price_lte=400" : ""
        }`;

        fetch(url)
            .then((response) => response.json())
            .then((data: Product[]) => {
                const sortedData =
                    sortOrder === "asc"
                        ? data.sort((a, b) => a.name.localeCompare(b.name)) // Сортировка по алфавиту
                        : data.sort((a, b) => b.name.localeCompare(a.name)); // Сортировка по алфавиту в обратном порядке
                setProducts((prevProducts) => (page === 1 ? sortedData : [...prevProducts, ...sortedData]));
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };


    const handleSortClick = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        pageRef.current = 1; // Сбрасываем номер страницы на первую.
        fetchProducts(1);
    };

    const handleFilterClick = () => {
        setProducts([]);
        pageRef.current = 1;
        fetchProducts(1, true); // Выполняем запрос с учетом фильтрации по цене
    };

    return (
        <PromotionPageWrapper>
            <SortButtonsWrapper><SortButton onClick={handleSortClick}>
                Sort by Name ({sortOrder === "asc" ? "A to Z" : "Z to A"})
            </SortButton>
                <FilterButton onClick={handleFilterClick}>Filter by Price
                    (&lt; $400)</FilterButton></SortButtonsWrapper>
            <ProductsContainer ref={containerRef}>
                {products.map((product) => (
                    <ProductCardWrapper key={product.id}>
                        <ProductCardComponent product={product}/>
                        {parseFloat(String(product.price)) < 400 && <DiscountTag>скидка</DiscountTag>}
                    </ProductCardWrapper>
                ))}
                {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
            </ProductsContainer>
        </PromotionPageWrapper>
    );
}

const SortButtonsWrapper = styled.div`
  display: flex;
  gap: 6.7rem;
`

const PromotionPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 800px;
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
`;

const FilterButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;
