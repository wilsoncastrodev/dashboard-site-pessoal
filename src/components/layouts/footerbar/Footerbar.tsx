import MenuHorizontal from "../../menus/menu-horizontal/MenuHorizontal";

const Footerbar = ({ menuItems }: any) => (
    <div className="footerbar d-flex d-md-none pb-0">
        <div className="footerbar-menu">
            <MenuHorizontal menuItems={menuItems} />
        </div>
    </div>
);

export default Footerbar;
