import {Link, Navigate} from "react-router-dom";

import logo from '../logo.svg'
import './LoginForm.css'
import {useState} from "react";

// import axios from "axios";

export default function RegisterForm () {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        if(password.length < 4 || password !== confirm){
            alert('Wrong password input. Check length and make sure both match!');
        } else {
            // await axios.post('register/', {
            //     'first_name': firstname,
            //     'last_name': lastname,
            //     'email': email,
            //     'password': password,
            // });

            setRedirect(true);
        }

        if(redirect){
            console.log(firstname.concat(' ', lastname, ' ', password, ' ', email));

            return <Navigate to={'/'} />
            // return <Navigate replace to='/login' />
        }

    }

    return (
         <main className="form-signin">
            <form onSubmit={submit}>
                <img src={logo} className="App-logo" alt="logo" width="150"/>
                <h1 className="h3 mb-3 fw-normal text-center">Please sign up</h1>

                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="firstName" placeholder="Michael" onChange={event => setFirstname(event.target.value)}/>
                    <label htmlFor="firstName">First Name</label>
                </div>

                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="lastName" placeholder="Jamie" onChange={event => setLastname(event.target.value)}/>
                    <label htmlFor="lastName">Last Name</label>
                </div>

                <div className="form-floating mb-2">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={event => setEmail(event.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                 <div className="form-floating">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={event => setConfirm(event.target.value)}/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-info" type="submit">Register</button>
            </form>
             <p className={"text-center mt-3"}>Already registered? <Link to={"/login"} className={"text-info text-decoration-none"}>Click to Login</Link></p>
        </main>
    )
}