import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormCategoryKnowledge from "./CreateFormCategoryKnowledge";

const AddCategoryKnowledge: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Categoria</Card.Title>
                <CreateFormCategoryKnowledge />
            </Card.Body>
        </Card>
    );
};

export default AddCategoryKnowledge;
