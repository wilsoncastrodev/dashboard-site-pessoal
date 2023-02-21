import { FC, Fragment } from "react";
import ListCategorySkill from "../../components/category-skill/ListCategorySkill";
import AddCategorySkill from "../../components/category-skill/AddCategorySkill";
import { Col, Row } from "react-bootstrap";
import MenuSkill from "../../components/menus/menu-page/MenuSkill";
import MediaQuery from "react-responsive";

const CategorySkillPage: FC = () => {
    return (
        <Fragment>
            <h3>Categoria de Habilidades</h3>
            <Row>
                <Col md={6} lg={7} xl={8}>
                    <MediaQuery maxWidth={768}>
                        <MenuSkill />
                    </MediaQuery>
                    <ListCategorySkill />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <MediaQuery minWidth={768}>
                        <MenuSkill />
                    </MediaQuery>
                    <AddCategorySkill />
                </Col>
            </Row>
        </Fragment>
    )
};

export default CategorySkillPage;
