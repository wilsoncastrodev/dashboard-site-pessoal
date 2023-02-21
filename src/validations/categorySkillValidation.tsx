import * as Yup from "yup";

export const categorySkillValidation = Yup.object().shape({
    name: Yup.string()
        .required("O campo Categoria é obrigatório"),
});
