import * as Yup from "yup";
import validator from "validator";

export const profileValidation = Yup.object().shape({
    name: Yup.string()
        .required("O campo Nome é obrigatório"),
    profession: Yup.string()
        .required("O campo Profissão é obrigatório"),
    age: Yup.number()
        .required("O campo Idade é obrigatório"),
    aboutMe: Yup.string()
        .required("O campo Sobre Mim é obrigatório"),
    characteristic: Yup.array().of(Yup.string().min(1)
    .required("Todos os campos de Característica são obrigatórios")),
    contacts: Yup.object().shape({
        website: Yup.string().test("url", "O campo Website é inválido", (value) => {
            return value && validator.isURL(value) ? true : false;
        }).required("O campo Website é obrigatório"),
        phone: Yup.string()
            .required("O campo Celular é obrigatório"),
        location: Yup.string()
            .required("O campo Localização é obrigatório"),
    }),
    social: Yup.object().shape({
        github: Yup.string().test("url", "O campo Github é inválido", (value) => {
                    return value && validator.isURL(value) ? true : false;
                }).required("O campo Github é obrigatório"),
        linkedin: Yup.string().test("url", "O campo Linkedin é inválido", (value) => {
                    return value && validator.isURL(value) ? true : false;
                }).required("O campo Linkedin é obrigatório"),
    }),
    cv: Yup.mixed().test("fileSize", "O tamanho do arquivo deve ser menor do que 2MB", (value) => {
        if (value) return value.size <= 2000000

        return true;
    }).required("O campo Currículo é obrigatório"),
});
