import * as Yup from "yup";

export const knowledgeValidation = Yup.object().shape({
    name: Yup.string()
        .required("O campo Conhecimento é obrigatório"),
    categoryKnowledge: Yup.string()
        .required("O campo Categoria é obrigatório, caso não exista nenhuma categoria, por favor, cadastrar para prosseguir"),
});
