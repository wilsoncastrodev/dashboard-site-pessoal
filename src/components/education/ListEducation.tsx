import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllProfileEducation, deleteEducation } from "../../stores/features/educationSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { MDCSnackbar } from '@material/snackbar';
import { FilterMatchMode } from 'primereact/api';
import EditFormEducation from "./EditFormEducation";
import MediaQuery from 'react-responsive';
import { Card } from "react-bootstrap";

const ListEducation: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const isLoading = useAppSelector((state: RootState) => state.education.isLoading);
    const educations = useAppSelector((state: RootState) => state.education.education);
    const dispatch = useAppDispatch();
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [items, setItems] = useState<any>([]);
    const [filters, setFilters] = useState<any>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        dispatch(getAllProfileEducation(user.profile._id));
    }, [dispatch, user, isLoading]);

    useEffect(() => {
        setItems(educations);
    }, [educations]);

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-3">
                <h5>Editar Educação</h5>
                <EditFormEducation data={data} />
            </div>
        );
    }

    const deleteItem = (data: any) => {
        const snackbarButton: any = document.getElementById('mdc-button');
        const mdcSnackbar: any = document.querySelector('.mdc-snackbar');
        const snackbar = new MDCSnackbar(mdcSnackbar);

        const _items = items.filter((education: any) => education._id !== data._id);
        setItems(_items);

        snackbar.timeoutMs = 10000;
        snackbar.labelText = "Educação excluída com sucesso";
        snackbar.actionButtonText = "Desfazer";
        snackbar.open();

        snackbarButton.addEventListener('click', () => setItems(items));
        snackbar.listen('MDCSnackbar:closed', (event: CustomEvent<{reason: string}>) => {
            if(event.detail.reason === 'dismiss') {
                dispatch(deleteEducation(data._id));
            }
        });
    }

    const actionBodyTemplate = (data: any) => {
        return (<button onClick={() => deleteItem(data)}><i className="fa-regular fa-trash-can"></i></button>);
    }

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
    };

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <span className="p-input-icon-left">
                <i className="fa-solid fa-magnifying-glass"></i>
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Pesquisar..." />
            </span>
        );
    };

    return (
        <Fragment>
            {
                items && items.length > 0 ?
                <Fragment>
                    <MediaQuery minWidth={960}>
                        <DataTable value={items} paginator rows={6} header={renderHeader()} filters={filters} responsiveLayout="stack"
                            expandedRows={expandedRows} emptyMessage="Não foi encontrado nenhum resultado"
                            collapsedRowIcon={"fa-regular fa-pen-to-square"}
                            expandedRowIcon={"fa-solid fa-pen-to-square"}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}>
                            <Column field="institution" header="Instituição" sortable />
                            <Column field="specialization" header="Curso" sortable />
                            <Column field="status" header="Status" sortable />
                            <Column header="Ações" expander={true} style={{ width: '35px', paddingRight: '15px', paddingBottom: '18px' }} />
                            <Column body={actionBodyTemplate} exportable={false} style={{ width: '80px' }} />
                        </DataTable>
                    </MediaQuery>
                    <MediaQuery maxWidth={960}>
                        <DataTable value={items} paginator rows={6} header={renderHeader()} filters={filters} responsiveLayout="stack"
                            expandedRows={expandedRows} emptyMessage="Não foi encontrado nenhum resultado"
                            collapsedRowIcon={"fa-regular fa-pen-to-square"}
                            expandedRowIcon={"fa-solid fa-pen-to-square"}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}>
                            <Column field="institution" header="Instituição" sortable />
                            <Column field="specialization" header="Curso" sortable />
                            <Column field="status" header="Status" sortable />
                            <Column header="Editar" expander={true} />
                            <Column header="Excluir" body={actionBodyTemplate} exportable={false} />
                        </DataTable>
                    </MediaQuery>
                </Fragment>
                 :  <Card className="mt-5">
                        <Card.Body>Não há nenhuma Educação cadastrada.</Card.Body>
                    </Card>
            }
        </Fragment>
    )
};

export default ListEducation;
