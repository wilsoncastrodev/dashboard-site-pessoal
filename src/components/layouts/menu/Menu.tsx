import { FC, Fragment } from "react";
import Sidebar from "../sidebar/Sidebar";
import Footerbar from "../footerbar/Footerbar";
import menuData from "./menuData";

const Menu: FC = () => (
    <Fragment>
        <Sidebar menuItems={menuData} />
        <Footerbar menuItems={menuData} />
    </Fragment>
);

export default Menu;
