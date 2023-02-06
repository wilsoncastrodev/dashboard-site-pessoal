import { FC } from "react";
import Card from "react-bootstrap/Card";
import CreateFormEducation from "./CreateFormEducation";

const AddEducation: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adicionar Educação</Card.Title>
                <CreateFormEducation />
            </Card.Body>
        </Card>
    );
};

export default AddEducation;
