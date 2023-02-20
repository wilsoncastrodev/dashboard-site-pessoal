import * as Yup from "yup";
import validator from "validator";

export const sourceKnowledgeValidation = Yup.object().shape({
    name: Yup.string()
        .required("O campo Nome é obrigatório"),
    description: Yup.string()
        .required("O campo Descrição é obrigatório"),
    link: Yup.string().test("url", "O campo Link é inválido", (value) => {
        return value && validator.isURL(value) ? true : false;
    }).required("O campo Link é obrigatório"),
    image: Yup.mixed().test("fileSize", "O tamanho da imagem deve ser menor do que 1MB", (value) => {
        if (value) return value.size <= 1000000;
        return true;
    }).required("O campo Imagem é obrigatório"),
});
