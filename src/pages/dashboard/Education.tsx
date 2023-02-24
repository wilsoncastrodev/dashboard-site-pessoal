import { FC, Fragment } from "react";
import ListEducation from "../../components/education/ListEducation";
import AddEducation from "../../components/education/AddEducation";
import { Col, Row } from "react-bootstrap";

const EducationPage: FC = () => {
    return (
        <Fragment>
            <h3>Educação</h3>
            <Row className="mt-5">
                <Col md={6} lg={7} xl={8}>
                    <ListEducation />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <AddEducation />
                </Col>
            </Row>
        </Fragment>
    )
};

export default EducationPage;
