import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';

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

const row = (x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {
    const currentlyEditing = editIdx === x.actorId;
    return (
        <TableRow key={`tr-${x.actorId}`}>
            {header.map((y, k) => (
                <TableCell key={`trc-${k}`}>
                    {currentlyEditing ? (
                        <TextField name={y.prop} onChange={() => handleChange()} value={x[y.prop]} />
                    ) : (
                            x[y.prop]
                        )}
                </TableCell>
            ))}
            <TableCell>
                {currentlyEditing ? (
                    <CheckIcon onClick={() => stopEditing()} />
                ) : (
                        <EditIcon onClick={() => startEditing(x.actorId)} />
                    )}
            </TableCell>
            <TableCell>
                <DeleteIcon onClick={() => handleRemove(x.actorId)} />
            </TableCell>
        </TableRow>
    );
}

export default ({ data, header, handleRemove, startEditing, editIdx, handleChange, stopEditing }) => {
    const clases = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={clases.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {header.map((x, i) => (
                            <TableCell key={`thc-${i}`}>{x.name}</TableCell>
                        ))}
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((x, i) =>
                        row(x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}