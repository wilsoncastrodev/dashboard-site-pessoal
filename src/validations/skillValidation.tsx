import * as Yup from "yup";

export const skillValidation = Yup.object().shape({
    name: Yup.string()
        .required("O campo Habilidade é obrigatório"),
    level: Yup.number()
        .required("O campo Nível é obrigatório"),
    categorySkill: Yup.string()
        .required("O campo Categoria é obrigatório, caso não exista nenhuma categoria, por favor, cadastrar para prosseguir"),
});
