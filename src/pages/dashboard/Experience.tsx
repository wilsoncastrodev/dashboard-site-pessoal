import { FC, Fragment } from "react";
import ListExperience from "../../components/experience/ListExperience";
import AddExperience from "../../components/experience/AddExperience";
import { Col, Row } from "react-bootstrap";

const ExperiencePage: FC = () => {
    return (
        <Fragment>
            <h3>Experiências</h3>
            <Row>
                <Col md={6} lg={7} xl={8}>
                    <ListExperience />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <AddExperience />
                </Col>
            </Row>
        </Fragment>
    )
};

export default ExperiencePage;
