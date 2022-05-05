import logo from '../logo.svg'
import './LoginForm.css'

export const RegisterForm = () => {
    return (
         <main className="form-signin">
            <form>
                <img src={logo} className="App-logo" alt="logo" width="150"/>
                <h1 className="h3 mb-3 fw-normal text-center">Please sign up</h1>

                <div className="form-floating">
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
        </main>
    )
}