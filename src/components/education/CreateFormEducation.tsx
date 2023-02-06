import { FC } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { educationValidation } from "../../validations/educationValidation";
import { createEducation } from "../../stores/features/educationSlice";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";

const CreateFormEducation: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={educationValidation}
            onSubmit={async (payload, { resetForm }) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Educação cadastrada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();

                await dispatch(createEducation(payload));
                resetForm();
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                institution: "",
                degree: "",
                specialization: "",
                from: "",
                to: "",
                current: false,
                description: "",
                status: "",
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
                            controlId="institution"
                        >
                            <Form.Label>Nome da Instituição</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Faculdade de Tecnologia de São Caetano do Sul"
                                name="institution"
                                value={values.institution}
                                autoFocus
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.institution &&
                                        errors.institution
                                    )
                                }
                                isValid={
                                    touched.institution && !errors.institution
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="institution" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="degree"
                        >
                            <Form.Label>Grau de Ensino</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tecnólogo"
                                name="degree"
                                value={values.degree}
                                onChange={handleChange}
                                isInvalid={!!(touched.degree && errors.degree)}
                                isValid={touched.degree && !errors.degree}
                            />
                                <div className="invalid">
                                    <ErrorMessage name="degree" />
                                </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="specialization"
                        >
                            <Form.Label>Curso</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Análise e Desenvolvimento de Sistemas"
                                name="specialization"
                                value={values.specialization}
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.specialization &&
                                        errors.specialization
                                    )
                                }
                                isValid={
                                    touched.specialization &&
                                    !errors.specialization
                                }
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.specialization}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="current"
                        >
                            <Row>
                                <Col>
                                    <Form.Label>Cursando Atuamente?</Form.Label>
                                </Col>
                                <Col className="text-end">
                                    <Form.Check
                                        type="switch"
                                        name="current"
                                        isInvalid={
                                            !!(
                                                touched.current &&
                                                errors.current
                                            )
                                        }
                                        isValid={
                                            touched.current && !errors.current
                                        }
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <div className="invalid">
                                <ErrorMessage name="current" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="6"
                            className="mt-2 mb-2"
                            controlId="from"
                        >
                            <Form.Label>Data de Início</Form.Label>
                            <div>
                                <Field name="from">
                                    {({ field }: any) => (
                                        <Calendar
                                            {...field}
                                            locale="pt-BR"
                                            value={values.from}
                                            dateFormat="dd/mm/yy"
                                            style={{ width: "100%" }}
                                            onChange={handleChange}
                                            placeholder="02/03/2014"
                                            className={
                                                !!(
                                                    touched.from &&
                                                    errors.from
                                                    )
                                                    ? "is-invalid"
                                                    : touched.from
                                                    ? "is-valid"
                                                    : ""
                                            }
                                        />
                                    )}
                                </Field>
                                <div className="invalid">
                                    <ErrorMessage name="from" />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="6"
                            className="mt-2 mb-2"
                            controlId="to"
                        >
                            <Form.Label>Data de Termino</Form.Label>
                            <div>
                                <Field name="to">
                                    {({ field }: any) => (
                                        <Calendar
                                            {...field}
                                            locale="pt-BR"
                                            value={values.current ? "" : values.to}
                                            dateFormat="dd/mm/yy"
                                            disabled={
                                                values.current ? true : false
                                            }
                                            style={{ width: "100%" }}
                                            onChange={handleChange}
                                            placeholder="20/12/2017"
                                            className={
                                                !!errors.to ? "is-invalid" : ""
                                            }
                                        />
                                    )}
                                </Field>
                                <div className="invalid">
                                    <ErrorMessage name="to" />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="status"
                        >
                            <Form.Label>Status</Form.Label>
                            <div>
                                <Field name="status">
                                    {({ field }: any) => (
                                        <Dropdown
                                            {...field}
                                            name="status"
                                            placeholder="Escolha uma opção:"
                                            value={values.status}
                                            onChange={handleChange}
                                            options={[
                                                "Superior Completo",
                                                "Superior Incompleto",
                                            ]}
                                            className={
                                                !!(
                                                    touched.status &&
                                                    errors.status
                                                    )
                                                    ? "is-invalid"
                                                    : touched.status
                                                    ? "is-valid"
                                                    : ""
                                            }
                                        />
                                    )}
                                </Field>
                                <div className="invalid">
                                    <ErrorMessage name="status" />
                                </div>
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

export default CreateFormEducation;
