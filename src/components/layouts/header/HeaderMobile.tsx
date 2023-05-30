import { FC } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../../stores/store";
import { logout } from "../../../stores/features/authSlice";

const HeaderMobile: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="d-flex d-md-none pb-0">
            <Container>
                <Row>
                    <Col xs={8} sm={8}>
                        <h1 className="header-logo text-white ps-2">
                            <Link className="text-white" to="/">
                                wCastro
                            </Link>
                        </h1>
                    </Col>
                    <Col xs={4} sm={4}>
                        <div className="text-end h-100">
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="px-1">
                                    <div className="navbox text-white text-decoration-none ms-1">
                                        <span>W</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {/* <Dropdown.Item>
                                        <Link to="/">Minha Conta</Link>
                                    </Dropdown.Item> */}
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

export default HeaderMobile;
