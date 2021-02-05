import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import UpdateIcon from '@material-ui/icons/Update';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import dateFormat from 'dateformat';
import Axios from "../../services/axios-instance";
import TableComp from '../../components/Table/Table4'
import Swal from "sweetalert2"

function TestHook() {
    // Declare a new state variable, which we'll call "count"
    const [filmId, setFilmId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [rentalDuration, setRentalDuration] = useState('');
    const [rentalRate, setRentalRate] = useState('');
    const [length, setLength] = useState('');
    const [replacementCost, setReplacementCost] = useState('');
    const [languageId, setLanguageId] = useState('');
    const [rating, setRating] = useState('');
    const [ratings, setRatings] = useState([
        { id: "G", label: "G" },
        { id: "PG", label: "PG" },
        { id: "PG13", label: "PG-13" },
        { id: "NC17", label: "NC-17" },
        { id: "R", label: "R" },
    ]);
    const [specialFeature, setSpecialFeature] = useState([]);
    const [featureCheck, setFeatureCheck] = useState([
        { status: false, label: "Commentaries" },
        { status: false, label: "Behind the Scenes" },
        { status: false, label: "Deleted Scenes" },
        { status: false, label: "Trailers" },
    ]);
    const [stateForm, setStateForm] = useState("Add");
    const columns = [
        { name: 'filmId', label: 'Film Id' },
        { name: 'title', label: 'Title' },
        { name: 'description', label: 'Description' },
        { name: 'releaseYear', label: 'Release Year' },
        {
            name: 'languageId', label: 'Language',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value.name;
                },
            }
        },
        { name: 'rentalDuration', label: 'Rental Duration' },
        { name: 'rentalRate', label: 'Rental Rate' },
        { name: 'length', label: 'Length' },
        { name: 'replacementCost', label: 'Cost' },
        {
            name: 'rating', label: 'Rating',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    switch (value) {
                        case "G":
                            return 'G'
                        case "PG":
                            return 'PG'
                        case "PG13":
                            return 'PG-13'
                        case "NC17":
                            return 'NC-17'
                        case "R":
                            return 'R'
                    }
                }
            },
        },
        {
            name: 'specialFeature', label: 'Special Features',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value + ", ";
                }
            }
        },
        {
            name: 'lastUpdate', label: 'Last Update',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return dateFormat(value, "mmmm dS, yyyy");
                }
            }
        }
    ];
    const [alert, setAlert] = useState(false);
    const [films, setFilms] = useState([]);
    useEffect(() => {
        if (films.length && !alert) {
            return;
        }
        Axios.get("film").then((response) => {
            setFilms(response.data)
            setAlert(false);
        })
    }, [alert, films])

    const [alertLanguages, setAlertLanguages] = useState(false);
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        if (languages.length && !alert) {
            return;
        }
        Axios.get("language").then((response) => {
            setLanguages(response.data)
            setAlertLanguages(false)
        })
    }, [alertLanguages, languages])

    const handleSubmitSave = (event) => {
        const film = {
            title: title,
            description: description,
            languageId: languageId,
            length: length,
            rating: rating,
            releaseYear: releaseYear,
            rentalDuration: rentalDuration,
            rentalRate: rentalRate,
            replacementCost: replacementCost,
            specialFeature: specialFeature
        }
        console.log(film)
        Swal.fire({
            icon: 'question',
            text: 'Your input data is correct?',
            showCancelButton: true,
            confirmButtonText: `Save`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (stateForm === "Add") {
                    Axios.post("film", film).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new film!',
                        }).then((result) => {
                            setTitle('')
                            setDescription('')
                            setLanguageId('')
                            setLength('')
                            setRating('')
                            setReleaseYear('')
                            setRentalDuration('')
                            setRentalRate('')
                            setReplacementCost('')
                            setSpecialFeature([])
                            setAlert(true)
                        })
                    })
                } else {
                    Axios.put("film/id/" + filmId, film).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully!',
                            text: 'You submit a new film!',
                        }).then((result) => {
                            setTitle('')
                            setDescription('')
                            setLanguageId('')
                            setLength('')
                            setRating('')
                            setReleaseYear('')
                            setRentalDuration('')
                            setRentalRate('')
                            setReplacementCost('')
                            setSpecialFeature([])
                            setStateForm('Add')
                            setAlert(true)
                        })
                    })
                }
            }
        })
    }
    const handleBackToAdd = () => {
        setTitle('')
        setDescription('')
        setStateForm('Add')
    }
    const handleUpdate = (i) => {
        Axios.get("film/id/" + i).then((response) => {
            console.log(response.data)
            setFilmId(response.data.filmId)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setLanguageId(response.data.languageId.languageId)
            setLength(response.data.length)
            setRating(response.data.rating)
            setReleaseYear(response.data.releaseYear)
            setRentalDuration(response.data.rentalDuration)
            setRentalRate(response.data.rentalRate)
            setReplacementCost(response.data.replacementCost)
            setSpecialFeature(response.data.specialFeature)
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
                Axios.delete("film/id/" + i).then((response) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully!',
                        text: 'You submit a new film!',
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
                    <Typography variant='h6'>film Page</Typography>
                </Grid>
            </Grid>
            <br />
            <Grid container className="">
                <Typography style={{ alignItems: 'center' }}>Form {stateForm}</Typography>
                <br />
                <Paper style={{ padding: 16, width: '100%', }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={4}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="Title" name="title" required value={title} onChange={e => setTitle(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-select-language"
                                select
                                label="Language"
                                name="languageId"
                                value={languageId}
                                onChange={e => setLanguageId(e.target.value)}
                                helperText="Please select your language"
                                style={{ width: "100%" }}
                            >
                                {languages.map((option) => (
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
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                helperText="Please select your Rating"
                                style={{ width: "100%" }}
                            >
                                {ratings.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField style={{ width: '100%', }} label="Description" name="description" required value={description} onChange={e => setDescription(e.target.value)} multiline rows={2} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="Release Year" name="releaseYear" required value={releaseYear} onChange={e => setReleaseYear(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarTodayIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="Length" name="length" required value={length} onChange={e => setLength(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="Rental Duration" name="rentalDuration" required value={rentalDuration} onChange={e => setRentalDuration(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <UpdateIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="Rental Rate" name="rentalRate" required value={rentalRate} onChange={e => setRentalRate(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField style={{ width: '100%', }} id="standard-basic" label="Replacement Cost" name="replacementCost" required value={replacementCost} onChange={e => setReplacementCost(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon />
                                    </InputAdornment>
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel component="legend">Special Features</FormLabel>
                            {featureCheck.map((x, i) => (
                                <FormControlLabel
                                    control={<Checkbox checked={specialFeature.includes(x.label) === true ? true : x.status} onChange={e => setSpecialFeature([...specialFeature, e.target.name])} name={x.label} />}
                                    label={x.label}
                                />
                            ))}
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 16 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!title || !description || !languageId || !rating || !length || !releaseYear || !rentalDuration || !rentalRate || !replacementCost || specialFeature.length < 1}
                                style={{ width: '100%' }}
                                onClick={handleSubmitSave}
                            >
                                {stateForm} Film
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
                    <Typography>List film</Typography>
                </Grid>
            </Grid>
            <br />
            <Grid container className="">
                <TableComp
                    allData={films}
                    allColumns={columns}
                    title="Table Film"
                    handleUpdate={handleUpdate}
                    handleRemove={handleRemove}
                />
            </Grid>
        </>
    );
}
export default TestHook