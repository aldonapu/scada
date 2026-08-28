import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboardlayout from "./layout/Dashboardlayout";
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css';
import Dashboard from "./pages/Dashboard";
import Data from "./pages/Data";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Dashboardlayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/data" element={<Data />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;