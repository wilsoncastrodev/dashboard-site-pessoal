import { FC } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import { registerValidation } from "../../validations/authValidation";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../stores/features/authSlice";
import { getToken } from "../../utils/token";

const FormRegister: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector((state: RootState) => state.auth);

    return (
        <Formik
            validationSchema={registerValidation}
            onSubmit={async (payload) => {
                await dispatch(register(payload));

                if (getToken()) {
                    navigate("/dashboard");
                }
            }}
            initialValues={{
                name: "",
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
                            controlId="name"
                        >
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o seu Nome"
                                name="name"
                                value={values.name}
                                autoFocus
                                onChange={handleChange}
                                className={auth.errors?.name ? "is-invalid" : ""}
                                isInvalid={!!(touched.name && errors.name)}
                                isValid={touched.name && !errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {auth.errors?.name && !errors.name
                                    ? auth.errors.name
                                    : errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-3"
                            controlId="email"
                        >
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o seu o E-mail"
                                name="email"
                                value={values.email}
                                autoComplete="email"
                                onChange={handleChange}
                                className={auth.errors?.email ? "is-invalid" : ""}
                                isInvalid={!!(touched.email && errors.email)}
                                isValid={touched.email && !errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                               {auth.errors?.email && !errors.email
                                    ? auth.errors.email
                                    : errors.email}
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
                                className={auth.errors?.password ? "is-invalid" : ""}
                                isInvalid={
                                    !!(touched.password && errors.password)
                                }
                                isValid={touched.password && !errors.password}
                            />

                            <Form.Control.Feedback type="invalid">
                                {auth.errors?.password && !errors.password
                                    ? auth.errors.password
                                    : errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="d-grid gap-2">
                        <Button type="submit" className="btn-block">
                            Cadastra-se
                        </Button>
                    </div>
                    <div className="text-center mt-3">
                        <span>Já tem uma conta? </span>
                        <Link to="/login">
                            <span>Entrar</span>
                        </Link>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormRegister;
