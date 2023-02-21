import { FC } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";

const MenuSkill: FC = () => {
    return (
        <Card className="mb-2 mb-md-4 menu-page">
            <Card.Body>
                <ListGroup horizontal>
                    <ListGroup.Item>
                        <NavLink
                            to="../habilidades"
                            className={({ isActive }) =>
                                isActive ? "menu-item active" : "menu-item"
                            }
                        >
                            <i className="fa-solid fa-book me-2"></i>
                            <span>Habilidades</span>
                        </NavLink>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <NavLink
                            to="../categorias/habilidades"
                            className={({ isActive }) =>
                                isActive ? "menu-item active" : "menu-item"
                            }
                        >
                            <i className="fa-solid fa-bars-staggered me-2"></i>
                            <span>Categorias</span>
                        </NavLink>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default MenuSkill;
