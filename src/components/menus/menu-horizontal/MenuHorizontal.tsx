import { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";

const MenuHorizontal = ({menuItems}: any) => {
    const [items, setItems] = useState(menuItems);
    const location = useLocation();

    const handleClick = (id: any) => ({ getItemById, scrollToItem }: any) => {
        scrollToItem(getItemById(id), "smooth", "center", "nearest");
    };

    const handleInit = ({ getItemById, scrollToItem }: any) => {
        const menu = items.filter((item: any) => {
            const route = location.pathname.split('/')[2] ? location.pathname.split('/').pop() : "";

            if(item.route === route) {
                return item;
            }
        });

        scrollToItem(getItemById(String(menu[0].id)), "auto", "start", 0);
    };

    return (
        <ScrollMenu transitionDuration={500} onInit={handleInit}>
            {items.map(({ id, name, icon, route }: any) => (
                <MenuItem
                    key={id}
                    name={name}
                    icon={icon}
                    route={route}
                    onClick={handleClick(id)}
                />
            ))}
        </ScrollMenu>
    );
};

export default MenuHorizontal;
