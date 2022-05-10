import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export const Welcome = () => {

    const [message, setMessage] = useState('You are not logged in');
    const [auth, setAuth] = useState(false);

    // Assigns access token to a variable if it exists
    useEffect(() => {
        (async () => {
            try {

                const response = await axios.get('user/', {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}
                });

                const user = response.data['data'];
                setMessage(`${user['first_name']} ${user['last_name']}`);

                setAuth(true);

            } catch (e) {
                console.log('You are not logged in yet!')
                setAuth(false);
            }
        })();
    }, []);

    let links;

    if (!auth){
        links = <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <Link to={"/register"} className="nav-link text-info">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chevron-right d-block mx-auto mb-1"
                                     viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1
                                    0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0
                                     1h2a.5.5 0 0 0 0-1h-2z"/>
                                </svg>
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to={"/login"} className="nav-link text-info">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chevron-right d-block mx-auto mb-1"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5
                                        0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276
                                        0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                </svg>
                                Login
                            </Link>
                        </li>
                    </ul>
    }
    else{
        links = <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <Link to={"/logout"} className="nav-link text-info">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chevron-right d-block mx-auto mb-1"
                                     viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                Logout
                            </Link>
                        </li>
                    </ul>
    }

    return (
        <div className="jumbotron">
            {links}
            <h1 className={"text-center pt-5"}>WELCOME TO REACT DJANGO AUTH COURSE</h1>
            <h3 className={'text-center text-error'}>{message}</h3>
        </div>
    )
}