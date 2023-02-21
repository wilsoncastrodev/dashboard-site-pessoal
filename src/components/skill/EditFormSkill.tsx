import { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { skillValidation } from "../../validations/skillValidation";
import { updateSkill } from "../../stores/features/skillSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";
import { Dropdown } from "primereact/dropdown";
import { Knob } from "primereact/knob";

const EditFormSkill = (skill: any) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);
    const categorySkill = useAppSelector((state: RootState) => state.categorySkill.categorySkill);
    const [category, setCategory] = useState<any>([]);

    useEffect(() => {
        setCategory([]);
        if (categorySkill && categorySkill.length > 0) {
            const _categorySkill = [...categorySkill]
            _categorySkill.sort((a: any, b: any) => a.name > b.name ? 1 : -1)

            _categorySkill.map((category: any) => {
                setCategory((prevCategory: any) => [...prevCategory, { name: category.name, value: category._id }]);
            })
        }
    }, [categorySkill]);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={skillValidation}
            onSubmit={async (payload) => {
                const mdcSnackbar: any =
                    document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Habilidade atualizada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(updateSkill(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: skill.data._id,
                name: skill.data.name,
                level: skill.data.level,
                categorySkill: skill.data.categorySkill._id,
                profile: {
                    _id: auth.user.profile._id,
                },
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
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
                                    <Form.Label>Habilidade</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="PHP"
                                        name="name"
                                        value={values.name}
                                        autoFocus
                                        onChange={handleChange}
                                        isInvalid={
                                            !!(touched.name && errors.name)
                                        }
                                        isValid={touched.name && !errors.name}
                                    />
                                    <div className="invalid">
                                        <ErrorMessage name="name" />
                                    </div>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    className="mt-2 mb-2"
                                    controlId="categorySkill"
                                >
                                    <Form.Label>Categoria</Form.Label>
                                    <div>
                                        <Field name="categorySkill">
                                            {({ field }: any) => (
                                                <Dropdown
                                                    {...field}
                                                    name="categorySkill"
                                                    placeholder="Escolha uma opção:"
                                                    value={values.categorySkill}
                                                    optionLabel="name"
                                                    optionValue="value"
                                                    onChange={handleChange}
                                                    options={category}
                                                    className={
                                                        !!(
                                                            touched.categorySkill &&
                                                            errors.categorySkill
                                                        )
                                                            ? "is-invalid"
                                                            : touched.categorySkill
                                                            ? "is-valid"
                                                            : ""
                                                    }
                                                />
                                            )}
                                        </Field>
                                        <div className="invalid">
                                            <ErrorMessage name="categorySkill" />
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
                                    controlId="level"
                                >
                                    <Form.Label>Nível</Form.Label>
                                    <div className="text-center">
                                        <Field name="level">
                                            {({ field }: any) => (
                                                <Knob
                                                    {...field}
                                                    name="level"
                                                    size={150}
                                                    valueColor="#1b6e91"
                                                    rangeColor="#dee2e6"
                                                    value={values.level}
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "level",
                                                            e.value
                                                        );
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <div className="invalid">
                                            <ErrorMessage name="level" />
                                        </div>
                                    </div>
                                </Form.Group>
                            </Row>
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
                </Form>
            )}
        </Formik>
    );
};

export default EditFormSkill;
