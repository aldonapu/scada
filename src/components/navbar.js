import "./navbar.scss";

export default function Navbar({ collapsed, mobileOpen, onToggle }) {
    const icon = mobileOpen ? "✕" : "☰";

    return (
        <header className={`navbar ${collapsed ? "navbar--collapsed" : ""}`}>
            <button className="navbar__toggle" onClick={onToggle}>
                {icon}
            </button>

            {/* <div className="navbar__profile">
                <div className="navbar__avatar">AD</div>
                <div>
                    <p className="navbar__name">Admin</p>
                    <p className="navbar__role">Super user</p>
                </div>
            </div> */}
        </header>
    );
}
