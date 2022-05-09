import {useEffect, useState} from "react";
import axios from "axios";

export const Welcome = () => {
    const [message, setMessage] = useState('You are not logged in');
    const [token, setToken] = useState('')

    // Assigns access token to a variable if it exists
    useEffect(() => {
        (async () => {
            try {
                setToken(localStorage.getItem('access_token'));
                const response = await axios.get('http://localhost:5000/api/v1/user/', {
                    withCredentials: true,
                    headers: {"Authorization": `Bearer ${token}`}
                });

                const user = response.data;

                console.log('USER');
                console.log(user);
            } catch (e) {
                console.log('You are not logged in yet!')
            }
        })();
    }, []);

    return (
        <div className="jumbotron">
            <h1 className={"text-center pt-5"}>WELCOME TO REACT DJANGO AUTH COURSE</h1>
            <h3 className={'text-center text-error'}>{message}</h3>
        </div>
    )
}