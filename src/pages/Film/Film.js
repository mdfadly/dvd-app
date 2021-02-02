import { React, Component } from 'react'
import TableComp from '../../components/Table/Table3'
import { Container, Grid, Typography, Button } from '@material-ui/core';
import './Film.css'
import Axios from "../../services/axios-instance";
import Swal from "sweetalert2";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import UpdateIcon from '@material-ui/icons/Update';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import dateFormat from 'dateformat';

class Film extends Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            filmId: "",
            description: "",
            title: "",
            releaseYear: "",
            languageName: "",
            rentalDuration: "",
            rentalRate: "",
            length: "",
            replacementCost: "",
            rating: "",
            ratings: [
                { id: "G", label: "G" },
                { id: "PG", label: "PG" },
                { id: "PG13", label: "PG-13" },
                { id: "NC17", label: "NC-17" },
                { id: "R", label: "R" },
            ],
            features: [
                "Commentaries", "Behind the Scenes", "Deleted Scenes", "Trailers"
            ],
            featureCheck: [
                { status: false, label: "Commentaries" },
                { status: false, label: "Behind the Scenes" },
                { status: false, label: "Deleted Scenes" },
                { status: false, label: "Trailers" },
            ],
            specialFeature: [],
            languageId: "",
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
            columns: [
                { field: 'filmId', title: 'Film Id' },
                { field: 'title', title: 'Title' },
                { field: 'description', title: 'Description' },
                { field: 'releaseYear', title: 'Release Year' },
                {
                    field: 'languageId.name', title: 'Language', render: rowData => rowData.languageId.name, customExport: rowData => rowData.languageId.name
                },
                { field: 'rentalDuration', title: 'Rental Duration' },
                { field: 'rentalRate', title: 'Rental Rate' },
                { field: 'length', title: 'Length' },
                { field: 'replacementCost', title: 'Cost' },
                { field: 'rating', title: 'Rating', lookup: { G: 'G', PG: 'PG', NC17: 'NC-17', PG13: 'PG-13', R: 'R' }, },
                {
                    field: 'specialFeature', title: 'Special Features', render: rowData => rowData.specialFeature.join(', ')
                },
                { field: 'lastUpdate', title: 'Last Update', render: rowData => dateFormat(rowData.lastUpdate, "mmmm dS, yyyy") },
            ],
            dataTable: [],
            conditions: false,
            stateForm: "Add",
            searchFilm: "",
            languages: [],

        }

        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.findFilm();
        this.findLanguage();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.conditions) {
            this.findFilm();
            this.setState({ conditions: false });
        }
    }

    findFilm() {
        Axios.get("film").then((response) => {
            console.log(response.data);
            this.setState({
                films: response.data
            })
        })
    }

    findLanguage() {
        Axios.get("language").then((response) => {
            console.log(response);
            this.setState({
                languages: response.data
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmitSave = (event) => {
        const film = {
            title: this.state.title,
            description: this.state.description,
            languageId: this.state.languageId,
            length: this.state.length,
            rating: this.state.rating,
            releaseYear: this.state.releaseYear,
            rentalDuration: this.state.rentalDuration,
            rentalRate: this.state.rentalRate,
            replacementCost: this.state.replacementCost,
            specialFeature: this.state.specialFeature
        }
        console.log(film)
        Swal.fire({
            icon: 'question',
            text: 'Your input data is correct?',
            showCancelButton: true,
            confirmButtonText: `Save`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.stateForm === "Add") {
                    Axios.post("film", film).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new Actor!',
                        }).then((result) => {
                            this.setState({
                                title: "", description: "", languageId: "", length: "", rating: "", releaseYear: "", rentalDuration: "", rentalRate: "", replacementCost: "", specialFeature: "", conditions: true,
                                featureCheck: [
                                    { status: false, label: "Commentaries" },
                                    { status: false, label: "Behind the Scenes" },
                                    { status: false, label: "Deleted Scenes" },
                                    { status: false, label: "Trailers" },
                                ],
                            })
                        })
                    })
                } else {
                    Axios.put("film/id/" + this.state.filmId, film).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new Actor!',
                        }).then((result) => {
                            this.setState({
                                title: "", description: "", languageId: "", length: "", rating: "", releaseYear: "", rentalDuration: "", rentalRate: "", replacementCost: "", specialFeature: "", conditions: true,
                                featureCheck: [
                                    { status: false, label: "Commentaries" },
                                    { status: false, label: "Behind the Scenes" },
                                    { status: false, label: "Deleted Scenes" },
                                    { status: false, label: "Trailers" },
                                ],
                            })
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
                Axios.delete("film/id/" + i).then((response) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully!',
                        text: 'You submit a new Actor!',
                    }).then((result) => {
                        this.setState({ conditions: true, stateForm: "Add" })
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
                            this.setState({ conditions: true, stateForm: "Add" })
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

        Axios.get("film/id/" + i).then((response) => {
            console.log(response);
            this.setState({
                filmId: response.data.filmId,
                title: response.data.title,
                description: response.data.description,
                releaseYear: response.data.releaseYear,
                languageId: response.data.languageId.languageId,
                rentalDuration: response.data.rentalDuration,
                rentalRate: response.data.rentalRate,
                replacementCost: response.data.replacementCost,
                length: response.data.length,
                rating: response.data.rating,
                specialFeature: response.data.specialFeature,
                stateForm: "Update"
            })
        })
    }

    handleSearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(event.target.value);
        if (event.target.value !== "") {
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
        } else {
            this.findFilm();
        }
    }

    handleChangeCheck = (event) => {
        console.log(event.target.name);
        this.setState({
            specialFeature: [...this.state.specialFeature, event.target.name]
        })
    };

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
                    <Typography style={{ alignItems: 'center' }}>Form {this.state.stateForm}</Typography>
                    <br />
                    <Paper style={{ padding: 16, width: '100%', }}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={4}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="Title" name="title" required value={this.state.title} onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="standard-select-language"
                                    select
                                    label="Language"
                                    name="languageId"
                                    value={this.state.languageId}
                                    onChange={this.handleChange}
                                    helperText="Please select your language"
                                    style={{ width: "100%" }}
                                >
                                    {this.state.languages.map((option) => (
                                        <MenuItem key={option.languageId} value={option.languageId}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="standard-select-rating"
                                    select
                                    label="Rating"
                                    name="rating"
                                    value={this.state.rating}
                                    onChange={this.handleChange}
                                    helperText="Please select your Rating"
                                    style={{ width: "100%" }}
                                >
                                    {this.state.ratings.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField style={{ width: '100%', }} label="Description" name="description" required value={this.state.description} onChange={this.handleChange} multiline rows={2} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="Release Year" name="releaseYear" required value={this.state.releaseYear} onChange={this.handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarTodayIcon />
                                            </InputAdornment>
                                        ),
                                    }} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="Length" name="length" required value={this.state.length} onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="Rental Duration" name="rentalDuration" required value={this.state.rentalDuration} onChange={this.handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <UpdateIcon />
                                            </InputAdornment>
                                        ),
                                    }} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="Rental Rate" name="rentalRate" required value={this.state.rentalRate} onChange={this.handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    }} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField style={{ width: '100%', }} id="standard-basic" label="Replacement Cost" name="replacementCost" required value={this.state.replacementCost} onChange={this.handleChange} InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend">Special Features</FormLabel>
                                {this.state.featureCheck.map((x, i) => (
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.specialFeature.includes(x.label) === true ? true : x.status} onChange={this.handleChangeCheck} name={x.label} />}
                                        label={x.label}
                                    />
                                ))}
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 16 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!this.state.title || !this.state.description || !this.state.languageId || !this.state.rating || !this.state.length || !this.state.releaseYear || !this.state.rentalDuration || !this.state.rentalRate || !this.state.replacementCost || this.state.specialFeature.length < 1}
                                    style={{ width: '100%' }}
                                    onClick={this.handleSubmitSave}
                                >
                                    {this.state.stateForm} Film
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
                        <Typography>List Film</Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="">
                    <TableComp
                        allData={this.state.films}
                        allColumns={this.state.columns}
                        startEditing={this.handleUpdate}
                        handleRemove={this.handleRemove}
                        formData="film"
                        title="Table Film"
                    />
                </Grid>
            </>
        )
    }
}

export default Film
