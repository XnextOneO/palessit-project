import styled from 'styled-components';
import { products, Product } from './card.tsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProductCard = styled.div`
  width: 30rem;
  height: 35rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 20rem;
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

function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const newProduct = products.find((p) => p.id === Number(id));
        setProduct(newProduct);
    }, [id]);

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <ProductContainer>
            <ProductCard>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>{product.price}</ProductPrice>
                </ProductInfo>
            </ProductCard>
        </ProductContainer>
    );
}

export default ProductPage;