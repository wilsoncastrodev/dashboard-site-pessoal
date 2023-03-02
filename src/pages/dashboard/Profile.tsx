import { FC, Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getProfileById } from "../../stores/features/profileSlice";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import EditFormProfile from "../../components/profile/EditFormProfile";
import MenuProfile from "../../components/menus/menu-page/MenuProfile";

const ProfilePage: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const isLoading = useAppSelector((state: RootState) => state.profile.isLoading);
    const profile = useAppSelector((state: RootState) => state.profile.profile);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileById(user.profile._id));
    }, [dispatch, user, isLoading]);

    return (
        <Fragment>
            <h3>Perfil</h3>
            <Row className="mt-5">
                <Col md={6} lg={5} xl={3}>
                    <MenuProfile profile={profile} user={user} />
                </Col>
                <Col md={6} lg={7} xl={9}>
                { profile ? <EditFormProfile profile={profile} /> : null }
                </Col>
            </Row>
        </Fragment>
    )
};

export default ProfilePage;
