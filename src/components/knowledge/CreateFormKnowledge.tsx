import { FC, useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { knowledgeValidation } from "../../validations/knowledgeValidation";
import { createKnowledge } from "../../stores/features/knowledgeSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";
import { Dropdown } from "primereact/dropdown";

const CreateFormKnowledge: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);
    const categoryKnowledge = useAppSelector((state: RootState) => state.categoryKnowledge.categoryKnowledge);
    const [category, setCategory] = useState<any>([]);

    useEffect(() => {
        setCategory([]);
        if (categoryKnowledge && categoryKnowledge.length > 0) {
            const _categoryKnowledge = [...categoryKnowledge]
            _categoryKnowledge.sort((a: any, b: any) => a.name > b.name ? 1 : -1)

            _categoryKnowledge.map((category: any) => {
                setCategory((prevCategory: any) => [...prevCategory, { name: category.name, value: category._id }]);
            })
        }
    }, [categoryKnowledge]);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={knowledgeValidation}
            onSubmit={async (payload, { resetForm }) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Conhecimento cadastrado com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(createKnowledge(payload));
                resetForm();
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                name: "",
                categoryKnowledge: "",
                profile: {
                    _id: auth.user.profile._id,
                },
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="form">
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="name"
                        >
                            <Form.Label>Conhecimento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Postman"
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
                            controlId="categoryKnowledge"
                        >
                            <Form.Label>Categoria</Form.Label>
                            <div>
                                <Field name="categoryKnowledge">
                                    {({ field }: any) => (
                                        <Dropdown
                                            {...field}
                                            name="categoryKnowledge"
                                            placeholder="Escolha uma opção:"
                                            value={values.categoryKnowledge}
                                            optionLabel="name"
                                            optionValue="value"
                                            onChange={handleChange}
                                            options={category}
                                            className={
                                                !!(
                                                    touched.categoryKnowledge &&
                                                    errors.categoryKnowledge
                                                )
                                                    ? "is-invalid"
                                                    : touched.categoryKnowledge
                                                        ? "is-valid"
                                                        : ""
                                            }
                                        />
                                    )}
                                </Field>
                                <div className="invalid">
                                    <ErrorMessage name="categoryKnowledge" />
                                </div>
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

export default CreateFormKnowledge;
