import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Axios from "../../services/axios-instance";
import { CsvBuilder } from "filefy";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        '& thead th': {
            fontWeight: '600',
            color: 'white',
            backroundColor: '#ffc500'
        }
    },
});
const _filefy = require("filefy");
// function stableSort(array, comparator) {
function getFieldValue(rowData, columnDef, lookup = true) {
    let value = rowData[columnDef.field]

    if (columnDef.lookup && lookup) {
        value = columnDef.lookup[value];
    }

    return value;
}
export default ({ allData, allColumns, startEditing, handleRemove, formData, title }) => {
    // const clases = useStyles();

    const deffexportCsv = (allColumns, allData) => {
        const columns = allColumns.filter(columnDef => columnDef["export"] !== false);
        const data = allData.map(rowData =>
            allColumns.map(columnDef => {
                // return this.getFieldValue(rowData, columnDef);
                if (typeof columnDef.customExport === "function") {
                    return columnDef.customExport(rowData);
                }
                let value = getFieldValue(rowData, columnDef);
                if (Array.isArray(value)) {
                    value = value.join(",");
                }
                return value;
            })
        );
        new _filefy.CsvBuilder('filename_.csv')
            // .setDelimeter(';')
            .setColumns(columns.map(columnDef => columnDef.title))
            .addRows(data)
            .exportFile();
    }
    return (
        <TableContainer component={Paper}>
            <MaterialTable
                columns={allColumns}
                data={allData}
                title={title}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => startEditing(formData === "actor" ? rowData.actorId : rowData.filmId)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => handleRemove(formData === "actor" ? rowData.actorId : rowData.filmId),
                    }
                ]}
                components={{
                    Action: props => {
                        if (props.action.icon === 'edit') {
                            return (
                                <Button >
                                    <EditIcon style={{ color: '#ffc500' }} onClick={(event) => props.action.onClick(event, props.data)} />
                                </Button>
                            )
                        }
                        if (props.action.icon === 'delete') {
                            return (
                                <Button style={{ color: '#ff5252' }}>
                                    <DeleteIcon onClick={(event) => props.action.onClick(event, props.data)} />
                                </Button>
                            )
                        }
                    }
                }}
                options={{
                    actionsColumnIndex: -1,
                    exportButton: true,
                    exportCsv: deffexportCsv,
                    exportAllData: true,
                }}
            />
        </TableContainer>
    );
}