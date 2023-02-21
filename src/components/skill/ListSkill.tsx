import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllProfileSkill, deleteSkill } from "../../stores/features/skillSlice";
import { getAllCategorySkill } from "../../stores/features/categorySkillSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { ProgressBar } from 'primereact/progressbar';
import { MDCSnackbar } from '@material/snackbar';
import EditFormSkill from "./EditFormSkill";
import MediaQuery from 'react-responsive'
import { Card } from "react-bootstrap";

const ListSkill: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const isLoading = useAppSelector((state: RootState) => state.skill.isLoading);
    const skills = useAppSelector((state: RootState) => state.skill.skill);
    const dispatch = useAppDispatch();
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        dispatch(getAllProfileSkill(user.profile._id));
        dispatch(getAllCategorySkill());
    }, [dispatch, user, isLoading]);

    useEffect(() => {
        setItems(skills);
    }, [skills]);

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-3">
                <h5>Editar Habilidade</h5>
                <EditFormSkill data={data} />
            </div>
        );
    }

    const deleteItem = (data: any) => {
        const snackbarButton: any = document.getElementById('mdc-button');
        const mdcSnackbar: any = document.querySelector('.mdc-snackbar');
        const snackbar = new MDCSnackbar(mdcSnackbar);

        const _items = items.filter((skill: any) => skill._id !== data._id);
        setItems(_items);

        snackbar.timeoutMs = 10000;
        snackbar.labelText = "Habilidade excluída com sucesso";
        snackbar.actionButtonText = "Desfazer";
        snackbar.open();

        snackbarButton.addEventListener('click', () => setItems(items));
        snackbar.listen('MDCSnackbar:closed', (event: CustomEvent<{reason: string}>) => {
            if(event.detail.reason === 'dismiss') {
                dispatch(deleteSkill(data._id));
            }
        });
    }

    const actionBodyTemplate = (data: any) => {
        return (<button onClick={() => deleteItem(data)}><i className="fa-regular fa-trash-can"></i></button>);
    }

    const progressBarTemplate = (data: any) => {
        return (<ProgressBar value={data.level}></ProgressBar>);
    }

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
                            <Column field="name" header="Habilidade" sortable />
                            <Column header="Categoria" field="categorySkill.name" sortable/>
                            <Column header="Nível" body={progressBarTemplate} field="level" sortable/>
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
                            <Column field="name" header="Habilidade" sortable />
                            <Column header="Categoria" field="categorySkill.name" sortable/>
                            <Column header="Nível" body={progressBarTemplate} field="level" sortable/>
                            <Column header="Editar" expander={true} />
                            <Column header="Excluir" body={actionBodyTemplate} exportable={false} />
                        </DataTable>
                    </MediaQuery>
                </Fragment>
                 :  <Card className="mt-5">
                        <Card.Body>Não há nenhuma Habilidade cadastrada.</Card.Body>
                    </Card>
            }
        </Fragment>
    )
};

export default ListSkill;
