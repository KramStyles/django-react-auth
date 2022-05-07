import {useEffect, useState} from "react";
import axios from "axios";

export const Welcome = () => {
    const [message, setMessage] = useState('You are not logged in');

    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:8080/api/v1/user/', {withCredentials: true});

            const user = response.data;

            console.log('USER');
            console.log(user);
        })();
    }, []);

    return(
        <div className="jumbotron">
            <h1 className={"text-center pt-5"}>WELCOME TO REACT DJANGO AUTH COURSE</h1>
            <h3 className={'text-center text-error'}>{message}</h3>
        </div>
    )
}