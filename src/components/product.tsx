import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const ProductDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
`;

const ProductDetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 90rem;
  height: 67rem;
`;

const ProductPriceButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const ImgAndOther = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6rem;
`;

const ProductDetailsImage = styled.img`
  width: 51rem;
  height: 36rem;
  object-fit: cover;
`;

const ProductDetailsName = styled.h2`
  margin-top: 0;
  font-size: 6rem;
`;

const ProductDetailsPrice = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        if (id) {
            fetch(`https://64ad67d8b470006a5ec5e9b1.mockapi.io/api/products/products/${id}`)
                .then((response) => response.json())
                .then((data) => setProduct(data))
                .catch((error) => console.log(error));
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <ProductDetailsContainer>
            <ProductDetailsCard>
                <ProductDetailsName>{product.name}</ProductDetailsName>
                <ImgAndOther>
                    <ProductDetailsImage src={product.image} alt={product.name} />
                    <ProductPriceButton>
                        <ProductDetailsPrice>${product.price}</ProductDetailsPrice>

                        <Button variant="outlined" size="small" endIcon={<LocalGroceryStoreOutlinedIcon />}>
                            Добавить в корзину
                        </Button>
                        <Button variant="outlined" size="small" endIcon={<BarChartIcon />}>
                            Добавить к сравнению
                        </Button>
                    </ProductPriceButton>
                </ImgAndOther>
            </ProductDetailsCard>
        </ProductDetailsContainer>
    );
}

export default ProductDetailsPage;