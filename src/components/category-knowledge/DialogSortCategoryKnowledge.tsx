import { Fragment, useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch } from "../../stores/store";
import { sortCategoriesKnowledge } from "../../stores/features/categoryKnowledgeSlice";
import { MDCSnackbar } from "@material/snackbar";

const DialogSortCategoryKnowledge = ({ categoriesKnowledge }: any) => {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState<boolean>(false);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        setItems(categoriesKnowledge)
    }, [categoriesKnowledge]);

    const columns = [
        { field: 'name' },
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} />;
    });

    const setKnowledgesSort = (categories: any) => {
        let categoriesKnowledgeSort;

        categoriesKnowledgeSort = categories.map((item: any) => {
            let _item: any = { ...item };

            delete _item.__v;
            delete _item.created_at;
            delete _item.updated_at;

            return _item;
        });

        return {
            categoriesKnowledge: categoriesKnowledgeSort,
        };
    }

    const footerContent = (
        <div>
            <Button label="Salvar"
                    className="btn btn-primary"
                    onClick={async () => {
                            const payload:any = setKnowledgesSort(items);
                            await dispatch(sortCategoriesKnowledge(payload));
                            setVisible(false);
                            const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                            const snackbar = new MDCSnackbar(mdcSnackbar);
                            snackbar.timeoutMs = 5000;
                            snackbar.labelText = "Categorias ordenadas com sucesso";
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
                header={"Ordenar Categorias de Habilidades"}
                visible={visible}
                style={{ width: '40vw' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
                breakpoints={{ '960px': '100vw' }}
            >
                <Row>
                    <Col>
                        <DataTable value={items} className="datatable-order"
                            reorderableRows
                            onRowReorder={(e) => {
                                let _categoriesKnowledge = e.value.map((category:any, key:any) => {
                                    let _category: any = { ...category };
                                    _category.order = key;
                                    return _category;
                                });

                                setItems(_categoriesKnowledge);
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

export default DialogSortCategoryKnowledge;
