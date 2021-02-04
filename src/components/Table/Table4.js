import React from 'react'
import MUIDataTable from "mui-datatables"
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

function Table4({ allData, allColumns, title, handleUpdate, handleRemove }) {

    const fileNameCsv = title+'.csv'
    const tempColumns = [
        ...allColumns,
        {
            name: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                download: false,
                print: false,
                searchAble: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <Button >
                                <EditIcon style={{ color: '#ffc500' }} onClick={(event) => handleUpdate(tableMeta.rowData[0])} />
                            </Button>
                            <Button style={{ color: '#ff5252' }}>
                                <DeleteIcon onClick={(event) => handleRemove(tableMeta.rowData[0])} />
                            </Button>
                        </>
                    );
                }
            }
        },
    ]
    const options = {
        responsive: 'simple',
        selectableRowsHeader: false,
        selectableRows: "none",
        searchPlaceholder: "search actor",
        filter: false,
        viewColumns: false,
        jumpToPage: true,
        downloadOptions : {
            filename: fileNameCsv,
            filterOptions:{
                useDisplayedColumnsOnly:true,
                useDisplayedRowsOnly: true
            }
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <MUIDataTable
                    title={title}
                    data={allData}
                    columns={tempColumns}
                    options={options}
                />
            </TableContainer>
        </>
    )
}
export default Table4