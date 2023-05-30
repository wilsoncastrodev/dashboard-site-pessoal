import { Button, Row, Col, Form, InputGroup, Card } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { profileValidation } from "../../validations/profileValidation";
import { MDCSnackbar } from "@material/snackbar";
import { updateProfile } from "../../stores/features/profileSlice";
import { useAppDispatch } from "../../stores/store";
import FileDropzone from "../dropzone/FileDropzone";
import { convertUrlToFile } from "../../utils/commons";

const EditFormProfile = ({ profile }: any) => {
    const dispatch = useAppDispatch();

    const handleCharacteristicChange = (i: any, e: any, values: any, setFieldValue: any ) => {
        const newValues: any = [...values];
        newValues[i] = e.target.value;
        setFieldValue("characteristic", newValues);
    };

    const addCharacteristicField = (values: any, setFieldValue: any) => {
        if (values.length < 7) {
            setFieldValue("characteristic", [...values, ""]);
        }
    };

    const removeCharacteristicField = (i: any, values: any, setFieldValue: any) => {
        const newValues = [...values];
        newValues.splice(i, 1);
        setFieldValue("characteristic", newValues);
    };

    return (
        <Formik
            validationSchema={profileValidation}
            onSubmit={async (payload) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Perfil atualizado com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();

                if(payload.cv.url && payload.cv.url.length > 0) {
                    payload.cv = await convertUrlToFile(payload.cv.url, payload.cv.filename, 'application/pdf');
                }

                await dispatch(updateProfile(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: profile._id,
                name: profile.name,
                age: profile.age,
                profession: profile.profession,
                aboutMe: profile.aboutMe,
                characteristic: profile.characteristic && profile.characteristic.length > 0 ? profile.characteristic : [""],
                contacts: {
                    website: profile.contacts?.website,
                    phone: profile.contacts?.phone,
                    location: profile.contacts?.location,
                },
                social: {
                    github: profile.social?.github,
                    linkedin: profile.social?.linkedin,
                },
                cv: profile.cv,
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
                setFieldValue,
            }) => (
                <Form onSubmit={handleSubmit} className="form">
                    <Card>
                        <Card.Body>
                            <Card.Title>Informações Pessoais</Card.Title>
                            <Row className="mb-3">
                                <Col xl={6}>
                                    <Row>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="name"
                                        >
                                            <Form.Label>
                                                Nome Completo
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wilson Castro da Paixão"
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
                                            controlId="profession"
                                        >
                                            <Form.Label>Profissão</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Desenvolvedor Full Stack PHP"
                                                name="profession"
                                                value={values.profession}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.profession &&
                                                        errors.profession
                                                    )
                                                }
                                                isValid={
                                                    touched.profession && !errors.profession
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="profession" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="age"
                                        >
                                            <Form.Label>Idade</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="32"
                                                name="age"
                                                value={values.age}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.age &&
                                                        errors.age
                                                    )
                                                }
                                                isValid={
                                                    touched.age && !errors.age
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="age" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="aboutMe"
                                        >
                                            <Form.Label>Sobre Mim</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="aboutMe"
                                                style={{ height: "392px" }}
                                                value={values.aboutMe}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.aboutMe &&
                                                        errors.aboutMe
                                                    )
                                                }
                                                isValid={
                                                    touched.aboutMe && !errors.aboutMe
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="aboutMe" />
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
                                            controlId="location"
                                        >
                                            <Form.Label>Localização</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="São Paulo, SP"
                                                name="contacts[location]"
                                                value={values.contacts.location}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.contacts
                                                            ?.location &&
                                                        errors.contacts?.location
                                                    )
                                                }
                                                isValid={
                                                    touched.contacts?.location && !errors.contacts?.location
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="contacts[location]" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="website"
                                        >
                                            <Form.Label>Website</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="https://www.wilsoncastro.dev"
                                                name="contacts[website]"
                                                value={values.contacts.website}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.contacts
                                                            ?.website &&
                                                        errors.contacts?.website
                                                    )
                                                }
                                                isValid={
                                                    touched.contacts?.website && !errors.contacts?.website
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="contacts[website]" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="phone"
                                        >
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="(11) 91464-0755"
                                                name="contacts[phone]"
                                                value={values.contacts.phone}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.contacts
                                                            ?.phone &&
                                                        errors.contacts?.phone
                                                    )
                                                }
                                                isValid={
                                                    touched.contacts?.phone && !errors.contacts?.phone
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="contacts[phone]" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="github"
                                        >
                                            <Form.Label>Github</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="https://github.com/wilsoncastrodev"
                                                name="social[github]"
                                                value={values.social.github}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.social
                                                            ?.github &&
                                                        errors.social?.github
                                                    )
                                                }
                                                isValid={
                                                    touched.social?.github && !errors.social?.github
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="social[github]" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="website"
                                        >
                                            <Form.Label>Linkedin</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="https://www.linkedin.com/in/w-castro/"
                                                name="social[linkedin]"
                                                value={values.social.linkedin}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!(
                                                        touched.social
                                                            ?.linkedin &&
                                                        errors.social?.linkedin
                                                    )
                                                }
                                                isValid={
                                                    touched.social?.linkedin && !errors.social?.linkedin
                                                }
                                            />
                                            <div className="invalid">
                                                <ErrorMessage name="social[linkedin]" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            className="mt-2 mb-2"
                                            controlId="cv"
                                        >
                                            <Form.Label>Currículo</Form.Label>
                                            <FileDropzone name="cv" />
                                            <div className="invalid">
                                                <ErrorMessage name="cv" />
                                            </div>
                                        </Form.Group>
                                    </Row>
                                </Col>
                                <Col xl={12}>
                                    <Form.Group
                                        as={Col}
                                        className="mt-2 mb-2"
                                        controlId="characteristic"
                                    >
                                        <Row>
                                            {values.characteristic.map(
                                                (
                                                    characteristic: any,
                                                    index: any
                                                ) => (
                                                    <div
                                                        className={"col-xl-6 form-inline " + (values.characteristic.length - 1) === index ? "" : "mb-3" }
                                                        key={index}
                                                    >
                                                        <Form.Label>
                                                            Caracteristica
                                                        </Form.Label>
                                                        <InputGroup>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Amo trabalhar com desenvolvimento Web;"
                                                                name="characteristic"
                                                                value={
                                                                    characteristic
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) => {
                                                                    handleCharacteristicChange(
                                                                        index,
                                                                        e,
                                                                        values.characteristic,
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                                isInvalid={
                                                                    !!(
                                                                        touched.characteristic &&
                                                                        errors.characteristic
                                                                    )
                                                                }
                                                                isValid={
                                                                    touched.characteristic && !errors.characteristic
                                                                }
                                                            />
                                                            {index ? (
                                                                <Button
                                                                    onClick={() =>
                                                                        removeCharacteristicField(
                                                                            index,
                                                                            values.characteristic,
                                                                            setFieldValue
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa-solid fa-minus"></i>
                                                                </Button>
                                                            ) : null}
                                                            {values
                                                                .characteristic
                                                                .length -
                                                                1 ===
                                                                index ? (
                                                                <Button
                                                                    onClick={() =>
                                                                        addCharacteristicField(
                                                                            values.characteristic,
                                                                            setFieldValue
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </Button>
                                                            ) : null}
                                                        </InputGroup>

                                                    </div>
                                                )
                                            )}
                                            <div className="invalid">
                                                {!!(
                                                        touched.characteristic &&
                                                        errors.characteristic
                                                    )
                                                    ? "Todos os campos de Característica são obrigatórios"
                                                    : null}
                                            </div>
                                        </Row>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-end">
                                <Button
                                    type="submit"
                                    className="btn btn-primary btn-primary-alt"
                                >
                                    Salvar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Form>
            )}
        </Formik>
    );
};

export default EditFormProfile;
