import {QueryClient, QueryClientProvider} from "react-query";

import {PageWrapper} from "./components/page-wrapper.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx";
import SpotlightComponent from "./pages/404.tsx";
import {Popular} from "./pages/popular.tsx";
import Userpage from "./pages/userpage.tsx";
import ProductDetailsPage from "./components/product.tsx";
import styled from "styled-components";


const queryClient = new QueryClient();
const MainWrapper = styled.div`
  height: 100vh;`

function App() {
    return (
        <MainWrapper><QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<PageWrapper header footer menu>
                    <Popular/>
                </PageWrapper>}/>
                <Route path="/login" element={
                    <PageWrapper>
                        <Login/>
                    </PageWrapper>
                }/>
                <Route path="/*" element={
                    <PageWrapper>
                        <SpotlightComponent/>
                    </PageWrapper>
                }/>
                <Route path="/product/:id" element={<PageWrapper header footer menu>
                    <ProductDetailsPage/>
                </PageWrapper>}/>
                <Route path="/user" element={<PageWrapper header footer menu>
                    <Userpage/>
                </PageWrapper>}/>
            </Routes>
        </QueryClientProvider></MainWrapper>
    );
}

export default App;