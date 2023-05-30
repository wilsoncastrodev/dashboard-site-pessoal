import { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { firstLetterName } from "../../../utils/commons";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MenuProfile = ({ profile }: any) => {
    return (
        <Fragment>
            <div className="menu-page">
                <Card className="mb-2 mb-md-4">
                    {profile && profile.name ? (
                        <Card.Body className="card-body-alt pt-2 pb-4">
                            <div className="profile-user-letter">
                                {firstLetterName(profile.name)}
                            </div>
                            <div className="profile-user-name mb-1">
                                {profile.name}
                            </div>
                            <div className="profile-user-profession">
                                {profile.profession}
                            </div>
                        </Card.Body>
                    ) : null}
                </Card>
                <Card className="mb-2 mb-md-4">
                    <Card.Body className="card-menu">
                        <ListGroup>
                            <ListGroup.Item className="mb-1">
                                <NavLink
                                    to="/dashboard/perfil"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? "menu-item active"
                                            : "menu-item"
                                    }
                                >
                                    <i className="fa-regular fa-user"></i>
                                    <span>Meu Perfil</span>
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "menu-item active d-none"
                                            : "menu-item d-none"
                                    }
                                >
                                    <i className="fa-solid fa-user-gear"></i>
                                    <span>Minha Conta</span>
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item className="mb-1">
                                <NavLink
                                    to="/dashboard/perfil/gerador-curriculo"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "menu-item active"
                                            : "menu-item"
                                    }
                                >
                                    <i className="fa-solid fa-file-signature"></i>
                                    <span>Gerador de Currículo</span>
                                </NavLink>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </Fragment>
    );
};

export default MenuProfile;
