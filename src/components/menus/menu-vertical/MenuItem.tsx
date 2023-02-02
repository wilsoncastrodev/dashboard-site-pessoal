import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const MenuItem = ({ name, icon, route }: any) => {
    return (
        <ListGroup.Item as="li">
            <NavLink
                to={route}
                end
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <div className="menu-icon">
                    <i className={icon}></i>
                </div>
                <div className="menu-name">{name}</div>
            </NavLink>
        </ListGroup.Item>
    );
};

export default MenuItem;
