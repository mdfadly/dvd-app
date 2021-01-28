import { React, Component } from 'react'
import { Container, Grid, Typography } from '@material-ui/core';
import './Actor.css'
import TableComp from '../../components/Table/Table'
import Axios from "../../services/axios-instance";

class Actor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: [],
            actorId: "",
            firstName: "",
            lastName: "",
            button: "simpan",
            editIdx: -1,
            columns: [
                {
                    name: 'Actor Id', prop: 'actorId'
                },
                {
                    name: 'First Name', prop: 'firstName'
                },
                {
                    name: 'Last Name', prop: 'lastName'
                },
                {
                    name: 'Last Update', prop: 'lastUpdate'
                }
            ]
        }

        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.findActor();
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

    handleRemove = () => {
        const provinsi = {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        console.log(provinsi)
    }

    startEditing = (i) => {
        console.log(i)
        Axios.get("actor/id/"+i).then((response) => {
            console.log(response);
            this.setState({
                actorId: response.data.actorId,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
            })
        })
        this.setState({
            editIdx: i,
        })
    }
    stopEditing = (i) => {
        this.setState({
            editIdx: -1
        })
    }

    handleChange2 = (e, name, i) => {
        const { value } = e.target;
        this.setState(state => ({
            actors: state.data.map(
                (row, j) => (j === i ? { ...row, [name]: value } : row)
            )
        }));
    }

    render() {
        return (
            <>
                <Grid container className="section">
                    <Grid item className="section_title" xs={12}>
                        <span></span>
                        <Typography variant='h6'>Actor Page</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography> lorem ipsum </Typography>
                    </Grid>
                </Grid>
                <Grid container className="">
                    <TableComp
                        handleRemove={this.handleRemove}
                        startEditing={this.startEditing}
                        editIdx={this.state.editIdx}
                        handleChange={this.handleChange}
                        stopEditing={this.stopEditing}
                        data={this.state.actors}
                        header={this.state.columns}
                    />
                </Grid>
                <Grid container className=""></Grid>
            </>
        )
    }
}

export default Actor
