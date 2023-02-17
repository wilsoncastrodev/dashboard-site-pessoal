import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormInterest from "./CreateFormInterest";

const AddInterest: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Interesse</Card.Title>
                <CreateFormInterest />
            </Card.Body>
        </Card>
    );
};

export default AddInterest;
