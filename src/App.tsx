import {QueryClient, QueryClientProvider} from "react-query";
import {PageWrapper} from "./components/page-wrapper.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx";
import SpotlightComponent from "./pages/404.tsx";
import {Popular} from "./pages/popular.tsx";
import Userpage from "./pages/userpage.tsx";
import ProductDetailsPage from "./pages/product.tsx";
import styled from "styled-components";
import BeerKing from "./pages/beer-king-game.tsx";
import CalcPc from "./pages/calc-pc.tsx";
import PromotionPage from "./pages/promotion-page.tsx";
import CartPage from "./pages/cart-page.tsx";
import {CartProvider} from './services/cart-context.tsx';


export default function App() {
    return (
        <CartProvider><MainWrapper>
            <QueryClientProvider client={queryClient}>
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
                    <Route path="/beerking" element={<PageWrapper header footer menu>
                        <BeerKing/>
                    </PageWrapper>}/>
                    <Route path="/beerking" element={<PageWrapper header footer menu>
                        <BeerKing/>
                    </PageWrapper>}/>
                    <Route path="/calcPC" element={<PageWrapper header footer menu>
                        <CalcPc/>
                    </PageWrapper>}/>
                    <Route path="/promotion" element={<PageWrapper header footer menu>
                        <PromotionPage/>
                    </PageWrapper>}/>
                    <Route path="cart-page" element={<PageWrapper header footer menu>
                        <CartPage/>
                    </PageWrapper>}/>
                </Routes>
            </QueryClientProvider>
        </MainWrapper></CartProvider>
    );
}


const queryClient = new QueryClient();
const MainWrapper = styled.div`
  height: 100vh;
  margin: 0px auto !important;
  padding: 0px !important;`