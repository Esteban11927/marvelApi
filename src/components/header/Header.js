import './Header.css'
import marvelLogo from '../../assets/Marvel.jpg';

export default function header(){

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
            <li><p>{localStorage.getItem("name")+" "+localStorage.getItem("lastName")}</p></li>
            <li onClick={handleClick} id="heroes"><p>List Of Heroes</p></li>
            <li onClick={handleClick} id="logOut"><p>Log out</p></li>
            <li id="marvelLogo"><img className="marvelLogo" src={marvelLogo} /></li>
        </ul>
    )
}