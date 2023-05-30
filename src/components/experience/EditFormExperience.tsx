import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { experienceValidation } from "../../validations/experienceValidation";
import { updateExperience } from "../../stores/features/experienceSlice";
import { Calendar } from "primereact/calendar";
import { Chips } from "primereact/chips";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";

const EditFormExperience = (experience: any) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={experienceValidation}
            onSubmit={async (payload) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Experiência atualizada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();

                await dispatch(updateExperience(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: experience.data._id,
                position: experience.data.position,
                company: experience.data.company,
                location: experience.data.location,
                from: experience.data.from,
                to: experience.data.to,
                current: experience.data.current,
                description: experience.data.description,
                technologies: experience.data.technologies,
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
                                controlId="position"
                            >
                                <Form.Label>Cargo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Desenvolvedor Full Stack Junior"
                                        name="position"
                                        value={values.position}
                                        autoFocus
                                        onChange={handleChange}
                                        isInvalid={
                                            !!(
                                                touched.position &&
                                                errors.position
                                            )
                                        }
                                        isValid={
                                            touched.position && !errors.position
                                        }
                                    />
                                    <div className="invalid">
                                        <ErrorMessage name="position" />
                                    </div>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    className="mt-2 mb-2"
                                    controlId="company"
                                >
                                    <Form.Label>Nome da Empresa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Studio Visual"
                                        name="company"
                                        value={values.company}
                                        onChange={handleChange}
                                        isInvalid={!!(touched.company && errors.company)}
                                        isValid={touched.company && !errors.company}
                                    />
                                    <div className="invalid">
                                        <ErrorMessage name="company" />
                                    </div>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    className="mt-2 mb-2"
                                    controlId="location"
                                >
                                    <Form.Label>Localização</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="São Paulo (Zona Sul), SP"
                                        name="location"
                                        value={values.location}
                                        onChange={handleChange}
                                        isInvalid={
                                            !!(
                                                touched.location &&
                                                errors.location
                                            )
                                        }
                                        isValid={
                                            touched.location &&
                                            !errors.location
                                        }
                                    />
                                    <div className="invalid">
                                        <ErrorMessage name="location" />
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
                                            <Form.Label>Trabalhando Atuamente?</Form.Label>
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
                                    <Form.Label>Data de Entrada</Form.Label>
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
                                                    placeholder="05/06/2019"
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
                                    <Form.Label>Data de Saída</Form.Label>
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
                                                    placeholder="01/10/2020"
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
                            </Row>
                        </Col>
                        <Col xl={6}>
                            <Row>
                            <Form.Group
                                    as={Col}
                                    md="12"
                                    className="mt-2 mb-2"
                                    controlId="technologies"
                                >
                                    <Form.Label>Tecnologias</Form.Label>
                                    <div>
                                        <Field name="technologies">
                                            {({ field }: any) => (
                                                <Chips
                                                {...field}
                                                name="technologies"
                                                placeholder="PHP, Laravel, Javascript, Typescript"
                                                value={values.technologies}
                                                onChange={handleChange}
                                                separator=","
                                                className={
                                                    !!(
                                                        touched.technologies &&
                                                        errors.technologies
                                                        )
                                                        ? "is-invalid"
                                                        : touched.technologies
                                                        ? "is-valid"
                                                        : ""
                                                }
                                                />
                                            )}
                                        </Field>
                                        <div className="invalid">
                                            <ErrorMessage name="technologies" />
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

export default EditFormExperience;
