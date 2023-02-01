import { FC } from "react";
import { Container } from "react-bootstrap";
import FormLogin from "../../components/forms/FormLogin";
import Logo from "../../components/logos/Logo";

const LoginPage: FC = () => (
    <Container className="auth-login">
        <div className="text-center">
            <Logo />
        </div>
        <div className="text-center mb-4">
            <span className="subtitle">Entre com o seu E-mail e Senha:</span>
        </div>
        <FormLogin />
    </Container>
);

export default LoginPage;
