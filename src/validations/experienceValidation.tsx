import * as Yup from "yup";

export const experienceValidation = Yup.object().shape({
    position: Yup.string()
        .required("O campo Cargo é obrigatório"),
    company: Yup.string()
        .required("O campo Nome da Empresa é obrigatório"),
    location: Yup.string()
        .required("O campo Localização é obrigatório"),
    from: Yup.string()
        .nullable()
        .required("O campo Data da Entrada é obrigatório"),
    to: Yup.string().nullable(),
    current: Yup.boolean()
        .required("O campo Trabalhando Atuamente? é obrigatório"),
    description: Yup.string()
        .required("O campo Descrição é obrigatório"),
    technologies: Yup.array().min(1, "Digite pelo menos 1 Tecnologia e aperte Enter").of(Yup.string()).required("O campo Tecnologia é obrigatório")
});
