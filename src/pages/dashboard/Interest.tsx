import { FC, Fragment } from "react";
import ListInterest from "../../components/interest/ListInterest";
import AddInterest from "../../components/interest/AddInterest";
import { Col, Row } from "react-bootstrap";

const InterestPage: FC = () => {
    return (
        <Fragment>
            <h3>Interesses</h3>
            <Row>
                <Col md={6} lg={7} xl={8}>
                    <ListInterest />
                </Col>
                <Col md={6} lg={5} xl={4}>
                    <AddInterest />
                </Col>
            </Row>
        </Fragment>
    )
};

export default InterestPage;
