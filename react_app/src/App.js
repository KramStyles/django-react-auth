import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css';
import LoginForm from "./components/LoginForm";
import {RegisterForm} from "./components/RegisterForm";
import {Welcome} from "./components/Welcome";

import {Navbar} from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Welcome />}/>
                <Route path={"/login"} element={<LoginForm />}/>
                <Route path={"/register"} element={<RegisterForm />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
