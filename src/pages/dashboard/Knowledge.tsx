import { FC, Fragment } from "react";
import ListKnowledge from "../../components/knowledge/ListKnowledge";
import AddKnowledge from "../../components/knowledge/AddKnowledge";
import { Col, Row } from "react-bootstrap";
import MenuKnowledge from "../../components/menus/menu-page/MenuKnowledge";
import MediaQuery from "react-responsive";

const KnowledgePage: FC = () => {
    return (
        <Fragment>
            <h3>Conhecimentos Complementares</h3>
            <Row>
                <Col md={6} lg={7} xl={8}>
                    <MediaQuery maxWidth={768}>
                        <MenuKnowledge />
                    </MediaQuery>
                    <ListKnowledge />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <MediaQuery minWidth={768}>
                        <MenuKnowledge />
                    </MediaQuery>
                    <AddKnowledge />
                </Col>
            </Row>
        </Fragment>
    )
};

export default KnowledgePage;
