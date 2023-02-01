import { FC } from "react";
import { Container } from "react-bootstrap";
import FormRegister from "../../components/forms/FormRegister";
import Logo from "../../components/logos/Logo";

const RegisterPage: FC = () => (
    <Container className="auth-register">
        <div className="text-center">
            <Logo />
        </div>
        <div className="text-center mb-4">
            <span className="subtitle">Crie sua conta:</span>
        </div>
        <FormRegister />
    </Container>
);

export default RegisterPage;
