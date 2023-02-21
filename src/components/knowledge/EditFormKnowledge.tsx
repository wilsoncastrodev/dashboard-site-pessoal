import { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { knowledgeValidation } from "../../validations/knowledgeValidation";
import { updateKnowledge } from "../../stores/features/knowledgeSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";
import { Dropdown } from "primereact/dropdown";

const EditFormKnowledge = (knowledge: any) => {
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
            onSubmit={async (payload) => {
                const mdcSnackbar: any =
                    document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Conhecimento atualizado com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(updateKnowledge(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: knowledge.data._id,
                name: knowledge.data.name,
                categoryKnowledge: knowledge.data.categoryKnowledge._id,
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
                            </Row>
                        </Col>
                        <Col xl={6}>
                            <Row>
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

export default EditFormKnowledge;
