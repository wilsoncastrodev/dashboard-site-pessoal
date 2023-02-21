import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormSkill from "./CreateFormSkill";

const AddSkill: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Habilidade</Card.Title>
                <CreateFormSkill />
            </Card.Body>
        </Card>
    );
};

export default AddSkill;
