import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { interestValidation } from "../../validations/interestValidation";
import { updateInterest } from "../../stores/features/interestSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";
import ImageDropzone from "../dropzone/ImageDropzone";
import { convertUrlToFile } from "../../utils/commons";

const EditFormInterest = (interest: any) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={interestValidation}
            onSubmit={async (payload) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Interesse atualizado com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();

                if(payload.image.url && payload.image.url.length > 0) {
                    payload.image = await convertUrlToFile(payload.image.url, payload.image.filename);
                }

                await dispatch(updateInterest(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: interest.data._id,
                content: interest.data.content,
                image: interest.data.image,
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
                            </Row>
                        </Col>
                        <Col xl={6}>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    className="mt-2 mb-2"
                                    controlId="from"
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

export default EditFormInterest;
