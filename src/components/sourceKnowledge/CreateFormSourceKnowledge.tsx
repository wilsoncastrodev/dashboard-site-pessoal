import { FC } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { sourceKnowledgeValidation } from "../../validations/sourceKnowledgeValidation";
import { createSourceKnowledge } from "../../stores/features/sourceKnowledgeSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";
import ImageDropzone from "../dropzone/ImageDropzone";

const CreateFormSourceKnowledge: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={sourceKnowledgeValidation}
            onSubmit={async (payload, { resetForm }) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Fonte de Conhecimento cadastrada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(createSourceKnowledge(payload));
                resetForm();
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                name: "",
                description: "",
                link: "",
                image: "",
                profile: {
                    _id: auth.user.profile._id,
                },
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit} className="form">
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="name"
                        >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Google"
                                name="name"
                                value={values.name}
                                autoFocus
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.name &&
                                        errors.name
                                    )
                                }
                                isValid={
                                    touched.name && !errors.name
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="name" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="description"
                        >
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.description &&
                                        errors.description
                                    )
                                }
                                isValid={
                                    touched.description && !errors.description
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="description" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="link"
                        >
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://www.google.com.br/"
                                name="link"
                                value={values.link}
                                autoFocus
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.link &&
                                        errors.link
                                    )
                                }
                                isValid={
                                    touched.link && !errors.link
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="link" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="image"
                        >
                            <Form.Label>Imagem</Form.Label>
                            <ImageDropzone name="image" />
                            <div className="invalid">
                                <ErrorMessage name="image" />
                            </div>
                        </Form.Group>
                    </Row>
                    <div className="text-end">
                        <Button type="submit" className="btn btn-primary btn-primary-alt">
                            Salvar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateFormSourceKnowledge;
