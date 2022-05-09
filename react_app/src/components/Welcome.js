import {useEffect, useState} from "react";
import axios from "axios";

export const Welcome = () => {

    const [message, setMessage] = useState('You are not logged in');

    // Assigns access token to a variable if it exists
    useEffect(() => {
        (async () => {
            try {

                const response = await axios.get('user/', {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}
                });

                const user = response.data['data'];
                setMessage(`${user['first_name']} ${user['last_name']}`);

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