import * as Yup from "yup";

export const educationValidation = Yup.object().shape({
    institution: Yup.string()
        .required("O campo Nome da Instituição é obrigatório"),
    degree: Yup.string()
        .required("O campo Grau de Ensino é obrigatório"),
    specialization: Yup.string()
        .required("O campo Curso é obrigatório"),
    from: Yup.string()
        .nullable()
        .required("O campo Data de Início é obrigatório"),
    to: Yup.string().nullable(),
    current: Yup.boolean()
        .required("O campo é obrigatório"),
    description: Yup.string()
        .required("O campo Descrição é obrigatório"),
    status: Yup.string()
        .required("O campo Status é obrigatório"),
});
