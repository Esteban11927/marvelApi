import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Comics from "../comics/Comics";
import './Hero.css';
import Header from '../header/Header';

const axios = require('axios');

export default function Hero(){
    const urlParams = useParams();
    const url = "https://gateway.marvel.com:443/v1/public/characters/"+urlParams.heroId;
    
    const [heroInfo, setHeroInfo] = useState({});

    async function queryHero(){
        const data = await axios.get(url, {
            params: {
                apikey: process.env.REACT_APP_API_KEY,
                ts: 1,
                hash: "8e7da411bd64145960f13817973496c8"
            }
        })
        setHeroInfo(data.data.data.results[0]);
    }
    useEffect(() => {
        queryHero();
    }, []);
    useEffect(() => {
        //console.log("heroinfo2", heroInfo);
    }, [heroInfo]);

    return (
        !localStorage.getItem("loggedIn") ? <Navigate to="/login"/> :
        <>
        <Header />
        <div className="heroContent">
            <div className="heroSummary">
                <div className="heroPic">
                    <img src={heroInfo.thumbnail ? heroInfo.thumbnail.path+"."+heroInfo.thumbnail.extension : ""} alt="" />
                </div>
                <div className="heroInfo">
                    <div className="heroText">
                        <h1>{heroInfo.name}</h1><br />
                        <div className="heroDescription">
                            <p>{heroInfo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Comics heroInfo={heroInfo}/>
        </div>
        </>
    )
}