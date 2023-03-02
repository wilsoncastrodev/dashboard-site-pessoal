import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/header/Header";
import Menu from "../components/layouts/menu/Menu";
import { Container } from "react-bootstrap";
import Snackbar from "../components/snackbars/Snackbar";

export const DashboardLayout: FC = () => {
    return (
        <Fragment>
            <Header />
            <Menu />
            <main>
                <Container className="mt-4 pb-5">
                    <Outlet />
                </Container>
            </main>
            <Snackbar />
        </Fragment>
    );
};

export default DashboardLayout;
