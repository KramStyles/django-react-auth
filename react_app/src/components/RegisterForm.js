import logo from '../logo.svg'
import './LoginForm.css'

export const RegisterForm = () => {
    return (
         <main className="form-signin">
            <form>
                <img src={logo} className="App-logo" alt="logo" width="150"/>
                <h1 className="h3 mb-3 fw-normal text-center">Please sign up</h1>

                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="firstName" placeholder="Michael"/>
                    <label htmlFor="firstName">First Name</label>
                </div>

                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="lastName" placeholder="Jamie"/>
                    <label htmlFor="lastName">Last Name</label>
                </div>

                <div className="form-floating mb-2">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                 <div className="form-floating">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-info" type="submit">Register</button>
            </form>
             <p className={"text-center text-danger mt-3"}>Already registered? <a href="/login">Click to Login</a></p>
        </main>
    )
}