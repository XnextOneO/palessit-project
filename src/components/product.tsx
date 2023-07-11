import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Product, products} from './card.tsx';
import {useEffect, useState} from "react";


const ProductDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ProductDetailsCard = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  height: 500px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
`;

const ProductDetailsImage = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

const ProductDetailsInfo = styled.div`
  width: 50%;
  padding: 2rem;
`;

const ProductDetailsName = styled.h2`
  margin-top: 0;
`;

const ProductDetailsPrice = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
`;


function ProductDetailsPage() {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        if (id) {
            const productId = parseInt(id);
            const foundProduct = products.find((p) => p.id === productId);
            setProduct(foundProduct);
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <ProductDetailsContainer>
            <ProductDetailsCard>
                <ProductDetailsImage src={product.image} alt={product.name}/>
                <ProductDetailsInfo>
                    <ProductDetailsName>{product.name}</ProductDetailsName>
                    <ProductDetailsPrice>${product.price}</ProductDetailsPrice>
                </ProductDetailsInfo>
            </ProductDetailsCard>
        </ProductDetailsContainer>
    );
}

export default ProductDetailsPage;