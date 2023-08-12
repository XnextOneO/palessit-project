import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Product from '../services/product-interface.tsx';

export default function ProductCardComponent({
                                                 product,
                                             }: {
    product: Product;
}): JSX.Element {
    return (
        <ProductCard to={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.name}/>
            <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price}</ProductPrice>
            </ProductInfo>
        </ProductCard>
    );
}

const ProductCard = styled(Link)`
  height: 22rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  border-radius: 12px;
  width: 16rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.3);
  }
  
  @media(max-width: 600px) {
    height: 15rem;
    width: 10rem;
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
`;

const ProductInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 14rem;
  padding: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 12px 12px;

  @media(max-width: 600px) {
    
    width: 8rem;
  }
`;

const ProductName = styled.h3`
  margin-top: 0;
`;

const ProductPrice = styled.p`
  margin-bottom: 0;
`;