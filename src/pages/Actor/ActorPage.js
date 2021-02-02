import { React, Component } from 'react'
import TableComp from '../../components/Table/Table3'
import { Container, Grid, Typography, Button } from '@material-ui/core';
import './Actor.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import Paper from '@material-ui/core/Paper';
import Axios from "../../services/axios-instance";
import Swal from "sweetalert2";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import dateFormat from 'dateformat';

class ActorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actors: [],
            actorId: "",
            firstName: "",
            lastName: "",
            searchActor: "",
            editIdx: -1,
            conditions: false,
            stateForm: "Add",
            columns: [
                { field: 'actorId', title: 'Actor Id' },
                { field: 'firstName', title: 'First Name' },
                { field: 'lastName', title: 'Last Name' },
                { field: 'lastUpdate', title: 'Last Update', render: rowData => dateFormat(rowData.lastUpdate, "mmmm dS, yyyy") },
            ]
        }

        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.findActor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.conditions) {
            this.findActor();
            this.setState({ conditions: false });
        }
    }

    findActor() {
        Axios.get("actor").then((response) => {
            console.log(response);
            this.setState({
                actors: response.data
            })
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmitSave = (event) => {
        const actor = {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        Swal.fire({
            icon: 'question',
            text: 'Your input data is correct?',
            showCancelButton: true,
            confirmButtonText: `Save`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.stateForm === "Add") {
                    Axios.post("actor", actor).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new Actor!',
                        }).then((result) => {
                            this.setState({ firstName: "", lastName: "", conditions: true })
                        })
                    })
                } else {
                    Axios.put("actor/id/" + this.state.actorId, actor).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new Actor!',
                        }).then((result) => {
                            this.setState({ firstName: "", lastName: "", conditions: true, stateForm: "Add" })
                        })
                    })
                }
            }
        })

    }

    handleRemove = (i) => {
        console.log(i)
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
                        this.setState({ firstName: "", lastName: "", conditions: true, stateForm: "Add" })
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
                            this.setState({ firstName: "", lastName: "", conditions: true, stateForm: "Add" })
                        })
                    }
                })
            } else if (result.isDenied) {

            }
        });
    }

    handleBackToAdd = () => {
        this.setState({
            firstName: "",
            lastName: "",
            stateForm: "Add"
        });
    }

    handleUpdate = (i) => {
        console.log(i)
        Axios.get("actor/id/" + i).then((response) => {
            console.log(response);
            this.setState({
                actorId: response.data.actorId,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                stateForm: "Update"
            })
        })
        this.setState({
            editIdx: i,
        })
    }

    handleSearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(event.target.value);
        if (event.target.value !== "") {
            Axios.get("actor/search/" + event.target.value).then((response) => {
                console.log(response);
                this.setState({
                    actors: response.data,
                })
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.header);
                }
                this.findActor();
            })
        } else {
            this.findActor();
        }
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            card: {
                width: 500,
                maxWidth: 300,
                margin: "auto",
                transition: "0.3s",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                }
            },
        }));

        return (
            <>
                <Grid container className="section">
                    <Grid item className="section_title" xs={12}>
                        <Typography variant='h6'>Actor Page</Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="">
                    <Typography style={{ alignItems: 'center' }}>Form {this.state.stateForm}</Typography>
                    <br />
                    <Paper style={{ padding: 16, width: '100%', }}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={6}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="First Name" name="firstName" required value={this.state.firstName} onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="Last Name" name="lastName" required value={this.state.lastName} onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: 16 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!this.state.firstName || !this.state.lastName}
                                    style={{ width: '100%' }}
                                    onClick={this.handleSubmitSave}
                                >
                                    {this.state.stateForm} Actor
                                </Button>
                            </Grid>
                            {(() => {
                                if (this.state.stateForm === 'Update') {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    style={{ width: '100%' }}
                                                    onClick={this.handleBackToAdd}
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
                        allData={this.state.actors}
                        allColumns={this.state.columns}
                        startEditing={this.handleUpdate}
                        handleRemove={this.handleRemove}
                        formData="actor"
                        title="Table Actor"
                    />
                </Grid>

            </>
        )
    }
}

export default ActorPage
