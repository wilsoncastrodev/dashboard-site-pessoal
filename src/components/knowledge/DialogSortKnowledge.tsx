import { Fragment, useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch } from "../../stores/store";
import { sortKnowledge } from "../../stores/features/knowledgeSlice";
import { MDCSnackbar } from "@material/snackbar";

const DialogSortKnowledge = ({ knowledge }: any) => {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState<boolean>(false);
    const [categoriesKnowledge, setCategoriesKnowledge] = useState<any>([]);
    const [knowledgeByCategorySort, setKnowledgesByCategorySort] = useState<any>({});
    const [knowledgeByCategory, setKnowledgesByCategory] = useState<any>(null);
    const [items, setItems] = useState<any>([]);
    const [buttonActive, setButtonActive] = useState<any>(0);

    useEffect(() => {
        if (knowledge && knowledge.length > 0) {
            let _knowledgeByCategory:any = {};

            knowledge.forEach((knowledge: any) => {
                _knowledgeByCategory[knowledge.categoryKnowledge.name] = [];
            });

            knowledge.forEach((knowledge: any) => {
                _knowledgeByCategory[knowledge.categoryKnowledge.name].push(knowledge);;
            });

            setKnowledgesByCategory(_knowledgeByCategory);
        }
    }, [knowledge]);

    useEffect(() => {
        if (knowledge && knowledge.length > 0) {
            let _knowledge: any = [];

            knowledge.forEach((knowledge: any) => {
                _knowledge.push(knowledge.categoryKnowledge.name);
            });

            setCategoriesKnowledge(_knowledge.filter((knowledge: any, index: any) => _knowledge.indexOf(knowledge) === index));
        }
    }, [knowledge]);

    useEffect(() => {
        let _items = knowledge.filter((item: any) => item.categoryKnowledge.name === categoriesKnowledge[0]);
        setItems(_items)
    }, [categoriesKnowledge]);

    const columns = [
        { field: 'name' },
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} />;
    });

    const setKnowledgesSort = (knowledge: any) => {
        let _knowledge:any = [];
        let knowledgeSort;

        Object.values(knowledge).forEach((knowledge:any) => {
            knowledge.forEach((item:any) => {
                _knowledge.push(item);
            });
        })

        knowledgeSort = _knowledge.map((item: any) => {
            let _item: any = { ...item };

            delete _item.__v;
            delete _item.created_at;
            delete _item.updated_at;

            _item.categoryKnowledge = item.categoryKnowledge._id;

            return _item;
        });

        return {
            knowledge: knowledgeSort,
        };
    }

    const footerContent = (
        <div>
            <Button label="Salvar"
                    className="btn btn-primary"
                    onClick={async () => {
                            const payload:any = setKnowledgesSort(knowledgeByCategorySort);
                            await dispatch(sortKnowledge(payload));
                            setVisible(false);
                            const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                            const snackbar = new MDCSnackbar(mdcSnackbar);
                            snackbar.timeoutMs = 5000;
                            snackbar.labelText = "Conhecimentos ordenados com sucesso";
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
                header={"Ordenar Conhecimentos Complementares"}
                visible={visible}
                style={{ width: '70vw' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
                breakpoints={{ '960px': '100vw' }}
            >
                <Row>
                    <Col md="4" className="mt-1">
                        {categoriesKnowledge.map((category: any, key: any) => (
                            <Button key={key}
                                className={"d-block w-100 mb-2 " + (key === buttonActive ? "active" : "")}
                                data-id={key}
                                onClick={(event:any) => {
                                    setButtonActive(event.target.dataset.id);
                                    setItems(knowledgeByCategory[category])
                                }}>

                                {category}
                            </Button>
                        ))}
                    </Col>
                    <Col>
                        <DataTable value={items} className="datatable-order mx-2"
                            reorderableRows
                            onRowReorder={(e) => {
                                let _knowledge = e.value.map((knowledge:any, key:any) => {
                                    let _knowledge: any = { ...knowledge };
                                    _knowledge.order = key;
                                    return _knowledge;
                                });

                                setKnowledgesByCategory({...knowledgeByCategory, [e.value[0].categoryKnowledge.name]: _knowledge});
                                setKnowledgesByCategorySort({...knowledgeByCategorySort, [e.value[0].categoryKnowledge.name]: _knowledge});
                                setItems(_knowledge);
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

export default DialogSortKnowledge;
