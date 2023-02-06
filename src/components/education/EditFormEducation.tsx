import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { educationValidation } from "../../validations/educationValidation";
import { updateEducation } from "../../stores/features/educationSlice";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";

const EditFormEducation = (education: any) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={educationValidation}
            onSubmit={async (payload) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Educação atualizada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();

                await dispatch(updateEducation(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: education.data._id,
                institution: education.data.institution,
                degree: education.data.degree,
                specialization: education.data.specialization,
                from: education.data.from,
                to: education.data.to,
                current: education.data.current,
                description: education.data.description,
                status: education.data.status,
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
                                            touched.institution &&
                                            !errors.institution
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
                                                checked={values.current}
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
                                                    value={new Date(values.from)}
                                                    dateFormat="dd/mm/yy"
                                                    style={{ width: "100%" }}
                                                    onChange={handleChange}
                                                    placeholder="02/03/2014"
                                                    className={
                                                        !!errors.from
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
                                                    value={values.current ? "" : new Date(values.to)}
                                                    dateFormat="dd/mm/yy"
                                                    disabled={
                                                        values.current ? true : false
                                                    }
                                                    style={{ width: "100%" }}
                                                    onChange={handleChange}
                                                    placeholder="20/12/2017"
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
                                                        !!errors.from
                                                            ? "is-invalid"
                                                            : touched.from
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
                            </Row>
                        </Col>
                        <Col xl={6}>
                            <Row>
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
                                    <div className="invalid">
                                        <ErrorMessage name="specialization" />
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

export default EditFormEducation;
