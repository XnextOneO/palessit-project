import Typography from "@mui/material/Typography";
import styled from "styled-components";
import ProductsPage from "../components/card.tsx";


export function Popular() {
    return (
        <PopularWrapper>
            <Typography variant="h5" gutterBottom color="blue">
                Популярное
            </Typography>
            <ProductsPage/>
        </PopularWrapper>
    )
}


const PopularWrapper = styled.div`
  display: flex;
  flex-direction: column;

`