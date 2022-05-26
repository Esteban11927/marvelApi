import { Navigate } from "react-router-dom";
import Header from "../header/Header";
import { useEffect, useState, useRef, useCallback } from "react";
import './Heroes.css';
const axios = require('axios');

export default function Heroes(){
    let [heroes, setHeroes] = useState([]);
    let [imgs, setImages] = useState(null);
    
    async function queryMarvel(offset=0){
        console.log("query");
        const url = "https://gateway.marvel.com:443/v1/public/characters"
        let aux = await axios.get(url, {
            params: {
                apikey: process.env.REACT_APP_API_KEY,
                ts: 1,
                hash: "8e7da411bd64145960f13817973496c8",
                offset: offset
            }
        })
        setHeroes([...heroes, ...aux.data.data.results]);
    }

    useEffect(() => {
        queryMarvel();
    }, []);

    
    const observer = useRef();
    const lastHero = useCallback((hero) => {
        //console.log(hero);
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((nodes) => {
            if(nodes[0].isIntersecting){
                queryMarvel(heroes.length);
            }
        })
        if(hero) observer.current.observe(hero);
    })

    useEffect(() => {
        let newImages = heroes.map((heroInfo, index) => {
            let heroName = heroInfo.name;
            let imgUrl = heroInfo.thumbnail.path;
            let ext = "."+heroInfo.thumbnail.extension;
            let comics = heroInfo.comics.available;
            let id = heroInfo.id;
            //const handleLiClick = () => {window.location.href=process.env.REACT_APP_BASE_URL+"/hero/"+id}
            return (
                <li className="hero" key={index} ref={index == heroes.length-1 ? lastHero : null} >
                    <a href={process.env.REACT_APP_BASE_URL+"/hero/"+id}>
                        <div className="heroPic">
                            <img src={imgUrl+ext} />
                        </div>
                        <div className="heroInfo">
                            <h3>{heroName}</h3><br />
                            <h4>{comics} Comics</h4>
                        </div>
                    </a>
                </li>
            )
        })
        setImages(newImages);
    }, [heroes]);


    return (
        !localStorage.getItem("loggedIn") ? <Navigate to="/login"/> : 
        <div className="heroes">
            <Header />
            <ul className="listOfHeroes">
                {imgs}
            </ul>
        </div>
    )
}