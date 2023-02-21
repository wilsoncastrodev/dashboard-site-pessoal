import { FC, Fragment } from "react";
import ListSourceKnowledge from "../../components/source-knowledge/ListSourceKnowledge";
import AddSourceKnowledge from "../../components/source-knowledge/AddSourceKnowledge";
import { Col, Row } from "react-bootstrap";

const SourceKnowledgePage: FC = () => {
    return (
        <Fragment>
            <h3>Interesses</h3>
            <Row>
                <Col md={6} lg={7} xl={8}>
                    <ListSourceKnowledge />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <AddSourceKnowledge />
                </Col>
            </Row>
        </Fragment>
    )
};

export default SourceKnowledgePage;
