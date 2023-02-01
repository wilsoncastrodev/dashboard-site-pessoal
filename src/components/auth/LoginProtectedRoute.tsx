import { FC } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/token";
import { ProtectedRoutesProps } from "../../types/authType";

const LoginProtectedRoute: FC<ProtectedRoutesProps> = ({ children }: any) => {
    if (getToken()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default LoginProtectedRoute;
