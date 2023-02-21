import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormSourceKnowledge from "./CreateFormSourceKnowledge";

const AddSourceKnowledge: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Fonte de Conhecimento</Card.Title>
                <CreateFormSourceKnowledge />
            </Card.Body>
        </Card>
    );
};

export default AddSourceKnowledge;
