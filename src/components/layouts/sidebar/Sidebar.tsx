import MenuVertical from "../../menus/menu-vertical/MenuVertical";
import Scrollbars from 'react-custom-scrollbars';

const Sidebar = ({ menuItems }: any) => (
    <div className="sidebar d-none d-md-flex pb-0">
        <div className="sidebar-menu">
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}
            renderThumbVertical={props => <div {...props} className="thumb-vertical" style={{ backgroundColor: '#cbd6da', borderRadius: '7px' }}/>}
            renderTrackHorizontal={(props): any => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
            renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
        >

                <MenuVertical menuItems={menuItems} />

        </Scrollbars></div>
    </div>
);

export default Sidebar;
