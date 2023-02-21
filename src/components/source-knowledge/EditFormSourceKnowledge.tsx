import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { sourceKnowledgeValidation } from "../../validations/sourceKnowledgeValidation";
import { updateSourceKnowledge } from "../../stores/features/sourceKnowledgeSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";
import ImageDropzone from "../dropzone/ImageDropzone";
import { convertUrlToFile } from "../../utils/commons";

const EditFormSourceKnowledge = (sourceKnowledge: any) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={sourceKnowledgeValidation}
            onSubmit={async (payload) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Fonte de Conhecimento atualizada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();

                if (payload.image.url && payload.image.url.length > 0) {
                    payload.image = await convertUrlToFile(payload.image.url, payload.image.filename);
                }

                await dispatch(updateSourceKnowledge(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: sourceKnowledge.data._id,
                name: sourceKnowledge.data.name,
                description: sourceKnowledge.data.description,
                link: sourceKnowledge.data.link,
                image: sourceKnowledge.data.image,
                profile: {
                    _id: auth.user.profile._id,
                },
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit} className="form">
                    <Row className="mb-3">
                        <Col xl={6}>
                            <Row>
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
                            </Row>
                        </Col>
                        <Col xl={6}>
                            <Row>
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
                        </Col>
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

export default EditFormSourceKnowledge;
