import { FC } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../../stores/store";
import { logout } from "../../../stores/features/authSlice";

const HeaderDesktop: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="d-none d-md-flex pb-0">
            <Container>
                <Row>
                    <Col sm={6}>
                        <h1 className="header-logo text-white">
                            <Link className="text-white" to="/">
                                wCastro
                            </Link>
                        </h1>
                    </Col>

                    <Col sm={6}>
                        <div className="d-lg-flex justify-content-end text-end h-100">
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    <span>
                                        Wilson Castro{" "}
                                        <i className="fa-solid fa-angle-down"></i>
                                    </span>
                                    <div className="navbox text-white text-decoration-none ms-1 me-2">
                                        <span>W</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to="/">Minha Conta</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>
                                        Sair
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default HeaderDesktop;
