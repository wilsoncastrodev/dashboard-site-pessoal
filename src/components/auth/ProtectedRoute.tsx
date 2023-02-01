import { FC } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/token";
import { ProtectedRoutesProps } from "../../types/authType";

const ProtectedRoute: FC<ProtectedRoutesProps> = ({ children }: any) => {
    if (!getToken()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
