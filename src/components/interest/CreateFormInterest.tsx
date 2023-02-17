import { FC } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { interestValidation } from "../../validations/interestValidation";
import { createInterest } from "../../stores/features/interestSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";
import ImageDropzone from "../dropzone/ImageDropzone";

const CreateFormInterest: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={interestValidation}
            onSubmit={async (payload, { resetForm }) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Interesse cadastrado com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(createInterest(payload));
                resetForm();
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                content: "",
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
                            controlId="content"
                        >
                            <Form.Label>Interesse</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Estudar e Aprender"
                                name="content"
                                value={values.content}
                                autoFocus
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.content &&
                                        errors.content
                                    )
                                }
                                isValid={
                                    touched.content && !errors.content
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="content" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="from"
                        >
                            <Form.Label>Imagem</Form.Label>
                            <ImageDropzone name="image" />
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

export default CreateFormInterest;
