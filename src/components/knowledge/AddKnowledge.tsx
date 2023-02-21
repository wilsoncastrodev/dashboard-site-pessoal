import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormKnowledge from "./CreateFormKnowledge";

const AddKnowledge: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Conhecimento</Card.Title>
                <CreateFormKnowledge />
            </Card.Body>
        </Card>
    );
};

export default AddKnowledge;
