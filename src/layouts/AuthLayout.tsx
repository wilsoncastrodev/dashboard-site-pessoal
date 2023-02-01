import { FC } from "react";
import { Outlet } from "react-router-dom";
import BgAuth from "../assets/images/backgrounds/bg-auth.jpg";

export const AuthLayout: FC = () => {
    return (
        <div className="auth-page">
            <div className="auth-page-content">
                <Outlet />
            </div>
            <div className="auth-page-bg d-none d-md-block">
                <img src={BgAuth} alt="Página de Autenticação" />
                <div className="bible-message">
                    <div>
                        <i className="fa-solid fa-quote-left"></i>
                        Sejam fortes e tenham coragem, todos vocês que põem a
                        sua esperança em Deus, o SENHOR!
                    </div>
                    <div className="mt-2">
                        <strong>- Salmos 31:24 NTLH</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
