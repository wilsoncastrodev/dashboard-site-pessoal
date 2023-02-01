import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
    email: Yup.string()
        .email("O E-mail fornecido deve ser válido")
        .required("O campo E-mail é obrigatório"),
    password: Yup.string()
        .required("O campo Senha é obrigatório"),
});

export const registerValidation = Yup.object().shape({
    name: Yup.string()
        .required("O campo Nome Completo é obrigatório"),
    email: Yup.string()
        .email("O E-mail fornecido deve ser válido")
        .required("O campo E-mail é obrigatório"),
    password: Yup.string()
        .min(8, "A senha precisa ter mais de 8 caracteres")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
            "A senha deve conter pelo menos uma letra e um número"
        )
        .required("O campo Senha é obrigatório"),
});
