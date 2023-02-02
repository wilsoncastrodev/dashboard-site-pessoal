import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { NavLink } from "react-router-dom";

const MenuItem = ({ onClick, name, icon, route }: any) => {
    const visibility = useContext(VisibilityContext);

    return (
        <div
            onClick={() => onClick(visibility)}
            tabIndex={0}
            className="menu"
        >
            <NavLink
                to={route}
                end
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <div>
                    <div className="menu-icon">
                        <i className={icon}></i>
                    </div>
                    <div className="menu-name">{name}</div>
                </div>
            </NavLink>
        </div>
    );
};

export default MenuItem;
