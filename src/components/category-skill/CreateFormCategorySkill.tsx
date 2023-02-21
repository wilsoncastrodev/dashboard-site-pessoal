import { FC } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { categorySkillValidation } from "../../validations/categorySkillValidation";
import { createCategorySkill } from "../../stores/features/categorySkillSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";

const CreateFormCategorySkill: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={categorySkillValidation}
            onSubmit={async (payload, { resetForm }) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Categoria cadastrada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(createCategorySkill(payload));
                resetForm();
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                name: "",
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
                            controlId="name"
                        >
                            <Form.Label>Nome da Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Back-End"
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

export default CreateFormCategorySkill;
