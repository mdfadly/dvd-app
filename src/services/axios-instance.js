import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://dvdapprental.herokuapp.com/api/'
});
// Alter defaults after instance has been created
export default instance;