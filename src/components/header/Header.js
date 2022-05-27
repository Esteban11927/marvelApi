import './Header.css';
import { useContext } from 'react';
import marvelLogo from '../../assets/Marvel.jpg';
import { AuthContext } from './../../helpers/authContext';
export default function Header(){
    const {name, lastName} = useContext(AuthContext);
    
    function handleClick(e){
        console.log(e.target.id);
        if(e.target.id == "heroes") window.location.href = process.env.REACT_APP_BASE_URL + "/heroes";
        if(e.target.id == "logOut"){
            localStorage.removeItem("loggedIn");
            window.location.reload();
        }
    }

    return (
        <ul className="headerMenu">
            <li><p>{name+" "+lastName}</p></li>
            <li onClick={handleClick} id="heroes"><p>List Of Heroes</p></li>
            <li onClick={handleClick} id="logOut"><p>Log out</p></li>
            <li id="marvelLogo"><img className="marvelLogo" src={marvelLogo} /></li>
        </ul>
    )
}