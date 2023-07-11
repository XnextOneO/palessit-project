import Typography from "@mui/material/Typography";
import ProductsPage from "../components/card.tsx";
import styled from "styled-components";


const PopularWrapper = styled.div`
display: flex;
flex-direction: column`


export function Popular() {
    return (
        <PopularWrapper>
            <Typography variant="h3" gutterBottom>
                Популярное
            </Typography>
            <ProductsPage/>
        </PopularWrapper>
    )
}