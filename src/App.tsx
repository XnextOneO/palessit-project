import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage"
import SpotlightComponent from "./pages/404.tsx"
import Login from "./pages/login.tsx";

function App() {
    return (

        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="*" element={<SpotlightComponent/>}></Route>
            </Routes>
        </div>

    )
}

export default App
