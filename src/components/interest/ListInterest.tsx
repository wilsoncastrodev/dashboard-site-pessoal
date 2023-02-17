import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllProfileInterest, deleteInterest } from "../../stores/features/interestSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { MDCSnackbar } from '@material/snackbar';
import EditFormInterest from "./EditFormInterest";
import MediaQuery from 'react-responsive'
import { Card } from "react-bootstrap";
import { Image } from 'primereact/image';

const ListInterest: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const isLoading = useAppSelector((state: RootState) => state.interest.isLoading);
    const interests = useAppSelector((state: RootState) => state.interest.interest);
    const dispatch = useAppDispatch();
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        dispatch(getAllProfileInterest(user.profile._id));
    }, [dispatch, user, isLoading]);

    useEffect(() => {
        setItems(interests);
    }, [interests]);

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-3">
                <h5>Editar Interesse</h5>
                <EditFormInterest data={data} />
            </div>
        );
    }

    const deleteItem = (data: any) => {
        const snackbarButton: any = document.getElementById('mdc-button');
        const mdcSnackbar: any = document.querySelector('.mdc-snackbar');
        const snackbar = new MDCSnackbar(mdcSnackbar);

        const _items = items.filter((interest: any) => interest._id !== data._id);
        setItems(_items);

        snackbar.timeoutMs = 10000;
        snackbar.labelText = "Interesse excluído com sucesso";
        snackbar.actionButtonText = "Desfazer";
        snackbar.open();

        snackbarButton.addEventListener('click', () => setItems(items));
        snackbar.listen('MDCSnackbar:closed', (event: CustomEvent<{reason: string}>) => {
            if(event.detail.reason === 'dismiss') {
                dispatch(deleteInterest(data._id));
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
                            <Column field="content" header="Interesse" sortable />
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
                            <Column field="content" header="Interesse" sortable />
                            <Column header="Editar" expander={true} />
                            <Column header="Excluir" body={actionBodyTemplate} exportable={false} />
                        </DataTable>
                    </MediaQuery>
                </Fragment>
                 :  <Card className="mt-5">
                        <Card.Body>Não há nenhum Interesse cadastrado.</Card.Body>
                    </Card>
            }
        </Fragment>
    )
};

export default ListInterest;
