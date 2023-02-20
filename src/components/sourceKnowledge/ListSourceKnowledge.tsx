import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllProfileSourceKnowledge, deleteSourceKnowledge } from "../../stores/features/sourceKnowledgeSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { MDCSnackbar } from '@material/snackbar';
import EditFormSourceKnowledge from "./EditFormSourceKnowledge";
import MediaQuery from 'react-responsive'
import { Card } from "react-bootstrap";
import { Image } from 'primereact/image';

const ListSourceKnowledge: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const isLoading = useAppSelector((state: RootState) => state.sourceKnowledge.isLoading);
    const sourceKnowledges = useAppSelector((state: RootState) => state.sourceKnowledge.sourceKnowledge);
    const dispatch = useAppDispatch();
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        dispatch(getAllProfileSourceKnowledge(user.profile._id));
    }, [dispatch, user, isLoading]);

    useEffect(() => {
        setItems(sourceKnowledges);
    }, [sourceKnowledges]);

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-3">
                <h5>Editar Fonte de Conhecimento</h5>
                <EditFormSourceKnowledge data={data} />
            </div>
        );
    }

    const deleteItem = (data: any) => {
        const snackbarButton: any = document.getElementById('mdc-button');
        const mdcSnackbar: any = document.querySelector('.mdc-snackbar');
        const snackbar = new MDCSnackbar(mdcSnackbar);

        const _items = items.filter((sourceKnowledge: any) => sourceKnowledge._id !== data._id);
        setItems(_items);

        snackbar.timeoutMs = 10000;
        snackbar.labelText = "Fonte de Conhecimento excluída com sucesso";
        snackbar.actionButtonText = "Desfazer";
        snackbar.open();

        snackbarButton.addEventListener('click', () => setItems(items));
        snackbar.listen('MDCSnackbar:closed', (event: CustomEvent<{reason: string}>) => {
            if(event.detail.reason === 'dismiss') {
                dispatch(deleteSourceKnowledge(data._id));
            }
        });
    }

    const actionBodyTemplate = (data: any) => {
        return (<button onClick={() => deleteItem(data)}><i className="fa-regular fa-trash-can"></i></button>);
    }

    const imageTemplate = (data: any) => {
        return (<Image src={data.image.url} alt={data.content} width="250" preview />)
    };

    return (
        <Fragment>
            {   items && items.length > 0 ?
                <Fragment>
                    <MediaQuery minWidth={960}>
                        <DataTable value={items} paginator rows={6} responsiveLayout="stack" className="mt-lg-5"
                            expandedRows={expandedRows}
                            collapsedRowIcon={"fa-regular fa-pen-to-square"}
                            expandedRowIcon={"fa-solid fa-pen-to-square"}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}>
                            <Column header="Imagem" body={imageTemplate} />
                            <Column field="name" header="Fonte de Conhecimento" sortable />
                            <Column field="description" header="Descrição" sortable />
                            <Column header="Ações" expander={true} style={{ width: '35px', paddingRight: '15px', paddingBottom: '18px' }} />
                            <Column body={actionBodyTemplate} exportable={false} style={{ width: '80px' }} />
                        </DataTable>
                    </MediaQuery>
                    <MediaQuery maxWidth={960}>
                        <DataTable value={items} paginator rows={6} responsiveLayout="stack" className="mt-lg-5"
                            expandedRows={expandedRows}
                            collapsedRowIcon={"fa-regular fa-pen-to-square"}
                            expandedRowIcon={"fa-solid fa-pen-to-square"}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}>
                            <Column header="Imagem" body={imageTemplate} />
                            <Column field="name" header="Fonte de Conhecimento" sortable />
                            <Column field="description" header="Descrição" sortable />
                            <Column field="link" header="Link" sortable />
                            <Column header="Editar" expander={true} />
                            <Column header="Excluir" body={actionBodyTemplate} exportable={false} />
                        </DataTable>
                    </MediaQuery>
                </Fragment>
                 :  <Card className="mt-5">
                        <Card.Body>Não há nenhuma Fonte de Conhecimento cadastrada.</Card.Body>
                    </Card>
            }
        </Fragment>
    )
};

export default ListSourceKnowledge;
