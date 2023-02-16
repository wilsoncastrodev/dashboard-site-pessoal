import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormExperience from "./CreateFormExperience";

const AddExperience: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Experiência</Card.Title>
                <CreateFormExperience />
            </Card.Body>
        </Card>
    );
};

export default AddExperience;
