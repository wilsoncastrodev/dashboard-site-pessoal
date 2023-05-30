import { FC, Fragment } from "react";
import EditFormProfile from "../../../components/profile/EditFormProfile";
import { useOutletContext } from 'react-router-dom';

const ProfilePage: FC = () => {
    const {profile}:any = useOutletContext();

    return (
        <Fragment>
            { profile ? <EditFormProfile profile={profile} /> : null }
        </Fragment>
    )
};

export default ProfilePage;
