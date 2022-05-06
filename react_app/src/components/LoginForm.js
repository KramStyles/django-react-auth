import {Link, Navigate} from "react-router-dom";

import logo from '../logo.svg'
import './LoginForm.css'
import {useState} from "react";
import axios from "axios";



export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)

    const submit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:8080/api/v1/login/', {
            email: email, password: password
        }, {withCredentials: true});
        // With Credentials added because we are expecting token and cookies from backend

        console.log(response, ' Response');
        setRedirect(true);
    }

    if (redirect){
        return <Navigate replace to={'/'} />
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <img src={logo} className="App-logo" alt="logo" width="150"/>
                <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-info" type="submit">Login</button>
            </form>
            <p className={"text-center mt-3"}>No account yet? Click to <Link to={"/register"} className={"text-decoration-none text-info"}>Register</Link></p>
        </main>
    );
}