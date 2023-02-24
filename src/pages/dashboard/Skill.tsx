import { FC, Fragment } from "react";
import ListSkill from "../../components/skill/ListSkill";
import AddSkill from "../../components/skill/AddSkill";
import { Col, Row } from "react-bootstrap";
import MenuSkill from "../../components/menus/menu-page/MenuSkill";
import MediaQuery from "react-responsive";

const SkillPage: FC = () => {
    return (
        <Fragment>
            <h3>Habilidades</h3>
            <Row className="mt-5">
                <Col md={6} lg={7} xl={8}>
                    <MediaQuery maxWidth={768}>
                        <MenuSkill />
                    </MediaQuery>
                    <ListSkill />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <MediaQuery minWidth={768}>
                        <MenuSkill />
                    </MediaQuery>
                    <AddSkill />
                </Col>
            </Row>
        </Fragment>
    )
};

export default SkillPage;
