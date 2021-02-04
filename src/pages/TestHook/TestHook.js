import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import dateFormat from 'dateformat';
import Axios from "../../services/axios-instance";
import TableComp from '../../components/Table/Table4'
import Swal from "sweetalert2"

function TestHook() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const [fruit, setFruit] = useState('banana');
    const [actorId, setActorId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [stateForm, setStateForm] = useState("Add");

    const columns = [
        { name: 'actorId', label: 'Actor Id' },
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        {
            name: 'lastUpdate', label: 'Last Update',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return dateFormat(value, "mmmm dS, yyyy");
                }
            }

        },
    ];
    const [alert, setAlert] = useState(false);
    const [actors, setActors] = useState([]);
    useEffect(() => {
        let mounted = true;
        if (actors.length && !alert) {
            return;
        }
        Axios.get("actor").then((response) => {
            setActors(response.data)
            setAlert(false);
        })
        return () => mounted = false;
    }, [alert, actors])

    const handleSubmitSave = (event) => {
        console.log(firstName)
        console.log(lastName)
        const actor = {
            firstName: firstName,
            lastName: lastName
        }
        Swal.fire({
            icon: 'question',
            text: 'Your input data is correct?',
            showCancelButton: true,
            confirmButtonText: `Save`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (stateForm === "Add") {
                    Axios.post("actor", actor).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new Actor!',
                        }).then((result) => {
                            setFirstName('')
                            setLastName('')
                            setAlert(true)
                        })
                    })
                } else {
                    Axios.put("actor/id/" + actorId, actor).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new Actor!',
                        }).then((result) => {
                            setFirstName('')
                            setLastName('')
                            setStateForm('Add')
                            setAlert(true)
                        })
                    })
                }
            }
        })
    }
    const handleBackToAdd = () => {
        setFirstName('')
        setLastName('')
        setStateForm('Add')
    }
    const handleUpdate = (i) => {
        Axios.get("actor/id/" + i).then((response) => {
            setActorId(response.data.actorId)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setStateForm("Update")
        })
    }
    const handleRemove = (i) => {
        Swal.fire({
            icon: 'warning',
            text: 'Do you want to delete this data?',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete("actor/id/" + i).then((response) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully!',
                        text: 'You submit a new Actor!',
                    }).then((result) => {
                        setStateForm("Add")
                        setAlert(true)
                    })
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.header);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                        }).then((result) => {
                            setStateForm("Add")
                        })
                    }
                })
            } else if (result.isDenied) {

            }
        });
    }
    return (
        <>
            <Grid container className="section">
                <Grid item className="section_title" xs={12}>
                    <Typography variant='h6'>Actor Page</Typography>
                </Grid>
            </Grid>
            <br />
            <Grid container className="">
                <Typography style={{ alignItems: 'center' }}>Form {stateForm}</Typography>
                <br />
                <Paper style={{ padding: 16, width: '100%', }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={6}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="First Name" name="firstName" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="Last Name" name="lastName" required value={lastName} onChange={e => setLastName(e.target.value)} />

                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 16 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!firstName || !lastName}
                                style={{ width: '100%' }}
                                onClick={handleSubmitSave}
                            >
                                {stateForm} Actor
                                </Button>
                        </Grid>
                        {(() => {
                            if (stateForm === 'Update') {
                                return (
                                    <>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                style={{ width: '100%' }}
                                                onClick={handleBackToAdd}
                                            >
                                                <ArrowBackIosIcon /> Back to add data
                                                </Button>
                                        </Grid>
                                    </>
                                )
                            }
                            return;
                        })()}

                    </Grid>
                </Paper>
            </Grid>
            <br />
            <Grid container className="">
                <Grid item xs={8}>
                    <Typography>List Actor</Typography>
                </Grid>
            </Grid>
            <br />
            <Grid container className="">
                <TableComp
                    allData={actors}
                    allColumns={columns}
                    title="Table Actor"
                    handleUpdate={handleUpdate}
                    handleRemove={handleRemove}
                />
            </Grid>
        </>
    );
}
export default TestHook