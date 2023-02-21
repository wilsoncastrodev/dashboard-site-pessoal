import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { categorySkillValidation } from "../../validations/categorySkillValidation";
import { updateCategorySkill } from "../../stores/features/categorySkillSlice";
import { datepickerTranslate } from "../../utils/dates";
import { MDCSnackbar } from "@material/snackbar";

const EditFormCategorySkill = (categorySkill: any) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    datepickerTranslate();

    return (
        <Formik
            validationSchema={categorySkillValidation}
            onSubmit={async (payload) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Categoria atualizada com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(updateCategorySkill(payload));
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                _id: categorySkill.data._id,
                name: categorySkill.data.name,
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

export default EditFormCategorySkill;
