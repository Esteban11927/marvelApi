import { Navigate } from "react-router-dom";
import Header from './../header/Header';

export default function details(){

    return (
        !localStorage.getItem("loggedIn") ? <Navigate to="/login"/> :
        <div className="details">
            <Header />
            <h1>details</h1>
        </div>
    )
}