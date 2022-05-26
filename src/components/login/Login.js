import './login.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(email == localStorage.email && password == localStorage.password){
            localStorage.setItem("loggedIn", true);
            window.location.reload();
        }
    }

    function handleChange(e){
        if(e.target.name == 'email') setEmail(e.target.value);
        if(e.target.name == 'password') setPassword(e.target.value);
    }

    return (
        localStorage.getItem("loggedIn") ? <Navigate to="/heroes"/> : 
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} action="/heroes">
                <label htmlFor="email">Correo: </label> <br />
                <input type="email" name="email" id="email" onChange={handleChange}/><br />

                <label htmlFor="password">Contraseña:</label><br />
                <input type="password" name="password" id="password" onChange={handleChange}/><br /> <br />

                <input type="submit" value="submit" />
            </form>
            <p>Usuario: esteban@gmail.com</p>
            <p>Contraseña: esteban</p>

        </div>
    )
}