import { React, Component } from 'react'
import TableComp from '../../components/Table/Table2'
import { Container, Grid, Typography } from '@material-ui/core';
import './Film.css'
import Axios from "../../services/axios-instance";
import Swal from "sweetalert2";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

class Film extends Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            filmId: "",
            description:"",
            title:"",
            releaseYear:"",
            languageName:"",
            rentalDuration:"",
            rentalRate:"",
            length:"",
            replacementCost:"",
            rating:"",
            specialFeatures:"",
            editIdx: -1,
            headCells: [
                { id: 'filmId', numeric: true, disablePadding: false, label: 'Film Id' },
                { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
                { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
                { id: 'releaseYear', numeric: false, disablePadding: true, label: 'Release Year' },
                { id: 'languageId', numeric: false, disablePadding: true, label: 'Language' },
                { id: 'rentalDuration', numeric: false, disablePadding: true, label: 'Rental Duration' },
                { id: 'rentalRate', numeric: false, disablePadding: true, label: 'Rental Rate' },
                { id: 'length', numeric: false, disablePadding: true, label: 'Length' },
                { id: 'replacementCost', numeric: false, disablePadding: true, label: 'Cost' },
                { id: 'rating', numeric: false, disablePadding: true, label: 'Rating' },
                { id: 'specialFeature', numeric: false, disablePadding: true, label: 'Special Features' },
                { id: 'lastUpdate', numeric: false, disablePadding: true, label: 'Last Update' },
                { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
            ],
            conditions: false,
            stateForm: "Add",
            searchFilm: "",
        }

        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.findFilm();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.conditions) {
            this.findFilm();
            this.setState({ conditions: false });
        }
    }

    findFilm() {
        Axios.get("film").then((response) => {
            console.log(response);
            this.setState({
                films: response.data
            })
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleRemove = (i) => {
        console.log(i)
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
    }

    handleSearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(event.target.value);
        if(event.target.value !== ""){
            Axios.get("film/search/" + event.target.value).then((response) => {
                console.log(response);
                this.setState({
                    films: response.data,
                })
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.header);
                }
                this.findFilm();
            })
        }else{
            this.findFilm();
        }  
    }
    
    render() {
        
        return (
            <>
                <Grid container className="section">
                    <Grid item className="section_title" xs={12}>
                        <Typography variant='h6'>Film Page</Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="">
                    <Grid item xs={8}>
                        <Typography>List Film</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            style={{ width: '100%', fontSize: '12px' }}
                            id="outlined-basic"
                            label="Search Film"
                            name="searchFilm"
                            value={this.state.searchFilm}
                            onChange={this.handleSearch}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid container className="">
                    <TableComp
                        rows={this.state.films}
                        headCells={this.state.headCells}
                        handleRemove={this.handleRemove}
                        startEditing={this.handleUpdate}
                        formData="film"
                    />
                </Grid>
            </>
        )
    }
}

export default Film
