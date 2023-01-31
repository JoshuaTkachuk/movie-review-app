import React,{useState, useEffect} from 'react';
import instance from '../axios';
import '../styles/MovieRow.css'
import {Link} from 'react-router-dom';
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';

const MovieRow =(props)=>{
    const [movies,setMovies]= useState([]);
    const searchValue = props.searchValue;
    const id = props.id;
    const base_url = "https://image.tmdb.org/t/p/original";
    const [scrollPosition, setScrollPosition] = useState(0);
    const [OFW, setOFW] = useState(4500);

    useEffect(() => {
        instance.get(`https://api.themoviedb.org/3/movie/${searchValue}?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US&page=1`)
            .then(list => {
                console.log(list.data.results)
                setMovies(list.data.results);
            })
            .catch(err => console.log(err))
    }, [])
    const scrollLeft=(e)=>{
        setOFW(document.getElementById(id).offsetWidth);
        document.getElementById(id).scrollLeft -= document.getElementById(id).offsetWidth;
        setScrollPosition(scrollPosition - document.getElementById(id).offsetWidth)
    }
    const scrollRight=(e)=>{
        setOFW(document.getElementById(id).offsetWidth);
        document.getElementById(id).scrollLeft += document.getElementById(id).offsetWidth;
        setScrollPosition(scrollPosition + document.getElementById(id).offsetWidth)
    }

    return(<div className='row-wrapper'>
        <h2 className='row-title'>{props.title}</h2>
        <div className='row'>
            {
                scrollPosition >= OFW ?
                <BsFillArrowLeftCircleFill size={120} color={"white"} className='scroll-button' onClick={(e) => scrollLeft(e)}/>
                :<BsFillArrowLeftCircleFill size={120} color={"white"} className='scroll-button-hidden'/>
            }
            <div className='movies' id={id}>
                        {
                            movies?
                            movies.map((movie, index) => {
                                return (
                                    <Link to={`/review/${movie.id}`} key={index}>
                                        <img className={movie.poster_path != null ? `movie`: null} src={movie.poster_path != null ? `${base_url}${movie.poster_path}`: null} alt={''} />
                                    </Link>
                                )
                            })
                            :<h2 style={{textAlign:"center", color:"white"}}>No results</h2>
                        }
                    </div>
                    {
                        scrollPosition <= 4500 - OFW?
                        <BsFillArrowRightCircleFill size={120} color={"white"} className='scroll-button' onClick={(e) => scrollRight(e)}/>
                        :<BsFillArrowRightCircleFill size={120} color={"white"} className='scroll-button-hidden'/>
                    }
    </div>
    </div>
    )
}
export default MovieRow;