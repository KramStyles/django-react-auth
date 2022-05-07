import {useEffect, useState} from "react";
import axios from "axios";

export const Welcome = () => {
    const [message, setMessage] = useState('You are not logged in');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/user/', {withCredentials: true});

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