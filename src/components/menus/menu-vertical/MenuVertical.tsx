import { ListGroup } from "react-bootstrap";
import MenuItem from "../menu-vertical/MenuItem";

const MenuVertical = ({ menuItems }: any) => {
    return (
        <ListGroup as="ul">
            {menuItems.map(({ id, name, icon, route }: any) => (
                <MenuItem key={id} name={name} icon={icon} route={route} />
            ))}
        </ListGroup>
    );
};

export default MenuVertical;
