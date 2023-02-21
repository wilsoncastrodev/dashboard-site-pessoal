import { FC, Fragment } from "react";
import ListCategoryKnowledge from "../../components/category-knowledge/ListCategoryKnowledge";
import AddCategoryKnowledge from "../../components/category-knowledge/AddCategoryKnowledge";
import { Col, Row } from "react-bootstrap";
import MenuKnowledge from "../../components/menus/menu-page/MenuKnowledge";
import MediaQuery from "react-responsive";

const CategoryKnowledgePage: FC = () => {
    return (
        <Fragment>
            <h3>Categorias de Conhecimentos Complementares</h3>
            <Row>
                <Col md={6} lg={7} xl={8}>
                    <MediaQuery maxWidth={768}>
                        <MenuKnowledge />
                    </MediaQuery>
                    <ListCategoryKnowledge />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <MediaQuery minWidth={768}>
                        <MenuKnowledge />
                    </MediaQuery>
                    <AddCategoryKnowledge />
                </Col>
            </Row>
        </Fragment>
    )
};

export default CategoryKnowledgePage;
