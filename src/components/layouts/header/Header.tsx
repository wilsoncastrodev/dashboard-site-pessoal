import { FC, Fragment } from "react";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

const Header: FC = () => (
    <Fragment>
        <HeaderDesktop />
        <HeaderMobile />
    </Fragment>
);

export default Header;
