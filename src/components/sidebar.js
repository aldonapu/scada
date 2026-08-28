import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const menuItems = [
    { path: "/", label: "Dashboard", icon: "pi pi-home" },
    { path: "/data", label: "Data", icon: "pi pi-database" },
    { path: "/orders", label: "Sensor", icon: "pi pi-sliders-v" },
    { path: "/users", label: "Users", icon: "pi pi-users" },
    { path: "/settings", label: "Settings", icon: "pi pi-cog" },
];

export default function Sidebar({ collapsed, mobileOpen, onToggle }) {
    return (
        <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${mobileOpen ? "sidebar--open" : ""}`}>
            <div className="sidebar__top">
                <div className="sidebar__brand">
                    <span className="sidebar__brand-mark">S</span>
                    {!collapsed && <span className="sidebar__brand-text">SCADA</span>}
                </div>
                <button className="sidebar__toggle sidebar__toggle--mobile" onClick={onToggle}>
                    ✕
                </button>
            </div>

            <nav className="sidebar__nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                        }
                    >
                        <i className={`${item.icon} sidebar__icon`}></i>
                        {!collapsed && <span className="sidebar__label">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
