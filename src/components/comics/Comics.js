import { useEffect, useState, useRef, useCallback } from 'react'
import './Comics.css'


const axios = require('axios')


export default function Comics(props){
    const heroInfo = props.heroInfo;
    let availableComics = heroInfo?.comics?.available;
    
    const [comics, setComics] = useState([]);
    const [cards, setCards] = useState(null);

    async function queryComics(offset=0){
        console.log("query");
        const url = "https://gateway.marvel.com:443/v1/public/characters/"+heroInfo.id+"/comics";
        let aux = await axios.get(url, {
            params: {
                apikey: process.env.REACT_APP_API_KEY,
                ts: 1,
                hash: "8e7da411bd64145960f13817973496c8",
                offset: offset
            }
        })
        setComics([...comics, ...aux.data.data.results]);
    }

    const observer = useRef();
    const lastComic = useCallback((comic) => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((nodes) => {
            if(nodes[0].isIntersecting){
                queryComics(comics.length);
            }
        })
        if(comic) observer.current.observe(comic);
    })

    useEffect(() => {
        availableComics = heroInfo?.comics?.available;
        if(heroInfo.id){
            queryComics();
        }
    }, [heroInfo])

    useEffect(() =>{
        let newCards = comics.map((comicInfo, index)=>{
            const comicTitle = comicInfo.title;
            const comicThumbnail = comicInfo.thumbnail.path+"."+comicInfo.thumbnail.extension;
            return(
                <li key={index} ref={(index == comics.length-1 && comics.length < availableComics) ? lastComic : null}>
                    <img src={comicThumbnail} alt="" />
                    <h1>{comicTitle}</h1>
                </li>
            )
        })
        setCards(newCards);
    }, [comics]);

    return(
        <div className="heroComic">
            <h1>There are {availableComics} comics</h1>
            <ul className="comicsList">
                {cards}
            </ul>
        </div>
    )
}