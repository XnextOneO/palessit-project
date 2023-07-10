import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Catalog from "../pages/catalog.tsx";

const ContentWrapper = styled.div`
  width: 92rem;
`;

function Content() {
    return (
        <ContentWrapper>
            <Routes>
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
        </ContentWrapper>
    );
}

export default Content;