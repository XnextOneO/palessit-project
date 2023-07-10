import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home-page.tsx";
import SpotlightComponent from "./pages/404.tsx";
import Login from "./pages/login.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import {ReactNode} from "react";
import Catalog from "./pages/catalog.tsx";

const queryClient = new QueryClient();
interface LayoutProps {
    children: ReactNode;
}
const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<SpotlightComponent/>}/>
                <Route path="/catalog" element={<Catalog/>}/>
                <Route path="/" element={<Layout><HomePage/></Layout>}/>
            </Routes>
        </QueryClientProvider>
    );
}

export default App;