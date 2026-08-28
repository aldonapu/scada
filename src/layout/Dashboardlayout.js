import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./Dashboardlayout.scss";

export default function Dashboardlayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggle = () => {
        if (window.innerWidth <= 768) {
            setMobileOpen((value) => !value);
            return;
        }

        setCollapsed((value) => !value);
    };

    return (
        <div className={`dashboard-layout ${collapsed ? "dashboard-layout--collapsed" : ""}`}>
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onToggle={handleToggle}
            />
            {mobileOpen && <div className="dashboard-layout__overlay" onClick={() => setMobileOpen(false)} />}
            <div className="dashboard-layout__content">
                <Navbar
                    collapsed={collapsed}
                    mobileOpen={mobileOpen}
                    onToggle={handleToggle}
                />
                <main className="dashboard-layout__main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
