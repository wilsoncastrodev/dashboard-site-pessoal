import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormCategorySkill from "./CreateFormCategorySkill";

const AddCategorySkill: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Categoria</Card.Title>
                <CreateFormCategorySkill />
            </Card.Body>
        </Card>
    );
};

export default AddCategorySkill;
