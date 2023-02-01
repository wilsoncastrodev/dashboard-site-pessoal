import { FC } from "react";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { loginValidation } from "../../validations/authValidation";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../stores/features/authSlice";
import { getToken } from "../../utils/token";

const FormLogin: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector((state: RootState) => state.auth);

    return (
        <Formik
            validationSchema={loginValidation}
            onSubmit={async (payload) => {
                await dispatch(login(payload));

                if (getToken()) {
                    navigate("/dashboard");
                }
            }}
            initialValues={{
                email: "",
                password: "",
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit} className="form-auth">
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-3"
                            controlId="email"
                        >
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o seu E-mail"
                                name="email"
                                value={values.email}
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                                className={auth.errors ? 'is-invalid' : ''}
                                isInvalid={!!(touched.email && errors.email)}
                                isValid={touched.email && !errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mb-3"
                            controlId="senha"
                        >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite a sua Senha"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className={auth.errors ? 'is-invalid' : ''}
                                isInvalid={!!(touched.password && errors.password)}
                                isValid={touched.password && !errors.password}
                            />

                            <Form.Control.Feedback type="invalid">
                                {auth.errors && !errors.password ? 'O E-mail ou Senha inválidos' : errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="d-grid gap-2">
                        <Button type="submit" className="btn-block">
                            Entrar
                        </Button>
                    </div>
                    <div className="text-center mt-3">
                        <span>Não tem uma conta? </span>
                        <Link to="/registrar">
                            <span>Cadastra-se</span>
                        </Link>
                    </div>
                    <Alert variant="primary">
                        <div className="mb-2">
                            <strong>
                                Utilize o e-mail e a senha a seguir para fins de
                                demonstração:
                            </strong>
                        </div>
                        <div>
                            <div>E-mail: contato@wilsoncastro.dev</div>
                            <div>Senha: wilsoncastro123</div>
                        </div>
                    </Alert>
                </Form>
            )}
        </Formik>
    );
};

export default FormLogin;
