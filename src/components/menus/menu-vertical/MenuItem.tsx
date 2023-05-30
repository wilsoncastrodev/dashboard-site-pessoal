import { NavLink, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

const MenuItem = ({ name, icon, route }: any) => {
    const [activeLink, setActiveLink] = useState<boolean>(false);
    const {pathname} = useLocation();

    useEffect(() => {
        (route === "habilidades" && pathname === "/dashboard/categorias/habilidades") ||
        (route === "conhecimentos-complementares" && pathname === "/dashboard/categorias/conhecimentos-complementares") ||
        (route === "perfil" && pathname === "/dashboard/perfil/gerador-curriculo")
        ? setActiveLink(true) : setActiveLink(false)
    }, [pathname]);

    return (
        <ListGroup.Item as="li">
            <NavLink
                to={route}
                end
                className={({ isActive }) =>
                    isActive || activeLink ? "menu-item active" : "menu-item"
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
