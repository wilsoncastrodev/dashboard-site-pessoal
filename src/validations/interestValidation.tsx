import * as Yup from "yup";

export const interestValidation = Yup.object().shape({
    content: Yup.string().required("O campo Interesse é obrigatório"),
    image: Yup.mixed().test("fileSize", "O tamanho da imagem deve ser menor do que 1MB", (value) => {
        if (value) return value.size <= 1000000

        return true;
    }).required("O campo Imagem é obrigatório"),
});
