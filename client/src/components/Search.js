import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import instance from '../axios';
import "../styles/Search.css";
import {Link} from 'react-router-dom';

const Search =()=>{
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        instance.get(`https://api.themoviedb.org/3/search/movie?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US&query=${search}&page=1&include_adult=false`)
            .then(list => {
                setMovies(list.data.results);
            })
            .catch(err => console.log(err))
    }, [search])
    return(<div>
        <Navbar location='search'/>
        <div className="search-wrapper">
            <input className="search-btn" placeholder="Search..." type={"search"} onChange={(e)=> setSearch(e.target.value)}></input>
            <div className="search-movies">
                {
                    movies?
                        movies.map((movie,idx)=>{
                            return<Link to={`/review/${movie.id}`} key={idx}>
                            <img className={movie.poster_path != null ? `search-movie`: null} src={movie.poster_path != null ? `${base_url}${movie.poster_path}`: null} alt={''} />
                        </Link>
                        })
                        :<></>
                }
            </div>
        </div>
    </div>)
}
export default Search;