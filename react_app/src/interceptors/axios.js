import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
axios.defaults.withCredentials = true; // With Credentials added because we are expecting token and cookies from backend


axios.interceptors.response.use(resp => resp, async error => {

    if (error.response.status === 401) {
        const response = await axios.get('refresh/');

        const originalConfig = error.config;
        console.log(originalConfig);
        if (response.status === 202){
            let access_token = response['data']['access_token'];
            localStorage.setItem('access_token', access_token);

            // return axios(error.config);
        }
    }

    console.log(error);
    return error;
})