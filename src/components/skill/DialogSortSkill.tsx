import { Fragment, useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch } from "../../stores/store";
import { sortSkills } from "../../stores/features/skillSlice";
import { MDCSnackbar } from "@material/snackbar";

const Dialogproduct = ({ skills }: any) => {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState<boolean>(false);
    const [categoriesSkill, setCategoriesSkill] = useState<any>([]);
    const [skillsByCategorySort, setSkillsByCategorySort] = useState<any>({});
    const [skillsByCategory, setSkillsByCategory] = useState<any>(null);
    const [items, setItems] = useState<any>([]);
    const [buttonActive, setButtonActive] = useState<any>(0);

    useEffect(() => {
        if (skills && skills.length > 0) {
            let _skillsByCategory:any = {};

            skills.forEach((skill: any) => {
                _skillsByCategory[skill.categorySkill.name] = [];
            });

            skills.forEach((skill: any) => {
                _skillsByCategory[skill.categorySkill.name].push(skill);;
            });

            setSkillsByCategory(_skillsByCategory);
        }
    }, [skills]);

    useEffect(() => {
        if (skills && skills.length > 0) {
            let _skills: any = [];

            skills.forEach((skill: any) => {
                _skills.push(skill.categorySkill.name);
            });

            setCategoriesSkill(_skills.filter((skill: any, index: any) => _skills.indexOf(skill) === index));
        }
    }, [skills]);

    useEffect(() => {
        let _items = skills.filter((item: any) => item.categorySkill.name === categoriesSkill[0]);
        setItems(_items)
    }, [categoriesSkill]);

    const columns = [
        { field: 'name' },
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} />;
    });

    const setSkillsSort = (skills: any) => {
        let _skills:any = [];
        let skillsSort;

        Object.values(skills).forEach((skill:any) => {
            skill.forEach((item:any) => {
                _skills.push(item);
            });
        })

        skillsSort = _skills.map((item: any) => {
            let _item: any = { ...item };

            delete _item.__v;
            delete _item.created_at;
            delete _item.updated_at;

            _item.categorySkill = item.categorySkill._id;

            return _item;
        });

        return {
            skills: skillsSort,
        };
    }

    const footerContent = (
        <div>
            <Button label="Salvar"
                    className="btn btn-primary"
                    onClick={async () => {
                            const payload:any = setSkillsSort(skillsByCategorySort);
                            await dispatch(sortSkills(payload));
                            setVisible(false);
                            const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                            const snackbar = new MDCSnackbar(mdcSnackbar);
                            snackbar.timeoutMs = 5000;
                            snackbar.labelText = "Habilidades ordenadas com sucesso";
                            snackbar.actionButtonText = "";
                            snackbar.open();
                        }
                    } />
        </div>
    );

    return (
        <Fragment>
            <button className="btn-switch btn-primary" onClick={(e) => { e.preventDefault(); setVisible(true) }}>
                <i className="fa-solid fa-arrow-up-1-9"></i>
            </button>
            <Dialog
                header={"Ordenar Habilidades"}
                visible={visible}
                style={{ width: '70vw' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
                breakpoints={{ '960px': '100vw' }}
            >
                <Row>
                    <Col md="4" className="mt-1">
                        {categoriesSkill.map((category: any, key: any) => (
                            <Button key={key}
                                className={"d-block w-100 mb-2 " + (key === buttonActive ? "active" : "")}
                                data-id={key}
                                onClick={(event:any) => {
                                    setButtonActive(event.target.dataset.id);
                                    setItems(skillsByCategory[category])
                                }}>

                                {category}
                            </Button>
                        ))}
                    </Col>
                    <Col>
                        <DataTable value={items} className="datatable-order mx-2"
                            reorderableRows
                            onRowReorder={(e) => {
                                let _skills = e.value.map((skill:any, key:any) => {
                                    let _skill: any = { ...skill };
                                    _skill.order = key;
                                    return _skill;
                                });

                                setSkillsByCategory({...skillsByCategory, [e.value[0].categorySkill.name]: _skills});
                                setSkillsByCategorySort({...skillsByCategorySort, [e.value[0].categorySkill.name]: _skills});
                                setItems(_skills);
                            }}>
                            <Column rowReorder style={{ width: '3rem' }} />
                            {dynamicColumns}
                        </DataTable>
                    </Col>
                </Row>
            </Dialog>
        </Fragment>
    );
};

export default Dialogproduct;
