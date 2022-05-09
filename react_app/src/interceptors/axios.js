import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
axios.defaults.withCredentials = true; // With Credentials added because we are expecting token and cookies from backend