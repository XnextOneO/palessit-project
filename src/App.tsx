import {QueryClient, QueryClientProvider} from "react-query";

import {PageWrapper} from "./components/page-wrapper.tsx";
import {Route, Routes} from "react-router-dom";
import Catalog from "./pages/catalog.tsx";
import Login from "./pages/login.tsx";
import SpotlightComponent from "./pages/404.tsx";
import {Popular} from "./pages/popular.tsx";
import ProductPage from "./components/product.tsx";
import Userpage from "./pages/userpage.tsx";


const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<PageWrapper header footer menu>
                    <Popular/>
                </PageWrapper>}/>
                <Route path="/catalog" element={<PageWrapper header footer menu>
                    <Catalog/>
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
                    <ProductPage/>
                </PageWrapper>}/>
                <Route path="/user" element={<PageWrapper header footer menu>
                    <Userpage/>
                </PageWrapper>}/>
            </Routes>
        </QueryClientProvider>
    );
}

export default App;