import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/header/Header";
import Menu from "../components/layouts/menu/Menu";

export const DashboardLayout: FC = () => {
    return (
        <Fragment>
            <Header />
            <Menu />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
};

export default DashboardLayout;
