import { FC, Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MenuProfile from "../components/menus/menu-page/MenuProfile";
import { Outlet } from "react-router-dom";
import { getProfileById } from "../stores/features/profileSlice";
import { getAllCategoryKnowledge } from "../stores/features/categoryKnowledgeSlice";
import { getAllCategorySkill } from "../stores/features/categorySkillSlice";
import { useAppDispatch, useAppSelector, RootState } from "../stores/store";
import { useLocation } from 'react-router-dom';

export const ProfileLayout: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const isLoading = useAppSelector((state: RootState) => state.profile.isLoading);
    const profile = useAppSelector((state: RootState) => state.profile.profile);
    const categoriesKnowledge = useAppSelector((state: RootState) => state.categoryKnowledge.categoryKnowledge);
    const categoriesSkill = useAppSelector((state: RootState) => state.categorySkill.categorySkill);
    const [profileCV, setProfileCV] = useState<any>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllCategoryKnowledge());
        dispatch(getAllCategorySkill());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProfileById(user.profile._id));
    }, [dispatch, user, isLoading]);

    useEffect(() => {
        if(categoriesSkill && categoriesKnowledge) {
            let _profile = { ...profile }
            _profile.categoriesSkill = categoriesSkill;
            _profile.categoriesKnowledge = categoriesKnowledge;
            setProfileCV(_profile);
        }
    }, [profile]);

    return (
        <Fragment>
            <Row className="mt-5">
                <Col md={6} lg={5} xl={3}>
                    <MenuProfile profile={profile} user={user} />
                </Col>
                <Col md={6} lg={7} xl={9}>
                    <Outlet context={{
                        profile: profile,
                        profileCV: profileCV,
                    }}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ProfileLayout;
