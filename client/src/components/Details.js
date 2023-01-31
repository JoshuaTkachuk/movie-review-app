import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import instance from '../axios';
import axios from 'axios';
import '../styles/Home.css'
import '../styles/ReviewList.css'
import '../styles/Detail.css'
import PopUp from './PopUp';
import Navbar from './Navbar';


const Details =(props) =>{
    const {id} = useParams();
    const [rating, setRating] = useState(null);
    const [trailer,setTrailer] = useState('');
    const [movie, setmovie] = useState({});
    const [editId, setEditId] = useState('');
    const [trigger, setTrigger] = useState(false)
    const [reviewed, setReviewed] = useState(false);
    const base_url = "https://image.tmdb.org/t/p/original";
    const navigate = useNavigate();
    
    const starClicked = (nextValue,prevValue,name)=>{
        setRating(nextValue);
    }
    async function searchDB(id){
        const result = await axios.get(`https://movie-review-app-mern.herokuapp.com/api/reviewMovieId/${id}`)
        console.log(result.data)
        if(result.data !== null){
            setReviewed(true)
            setEditId(result.data._id)
        }
    }

    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            console.log(result.data)
            setmovie(result.data)
            searchDB(result.data.id);
        })
        .catch(err =>console.log(err))
    },[])
    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            if(result.data.results.length > 0){
                for(const key of Object.keys(result.data.results)){
                    if(result.data.results[key].name.toLowerCase().includes("trailer")){
                        setTrailer(result.data.results[key].key);
                        break;
                    }
                }
            }
            else{
                setTrailer(result.data.results[0]);
            }
        })
        .catch(err =>console.log(err))
    },[])
    return(
        <div className='wrapper'>
            <Navbar/>
            <div className='page'>
                <div className='detail-wrapper'>
                    <div className='poster-wrapper'>
                        <img className='movie-poster' src={`${base_url}${movie.poster_path}`} alt=''></img>
                        <h2 style={{textAlign:"center", color:"white", marginBottom: "0", maxWidth: 353}}>{movie.title}</h2>
                        <PopUp setTrigger={setTrigger} triggered={trigger} trailer={trailer}/>
                        <button className='trailer-button' onClick={(e)=>{
                            if(trigger === true){
                                setTrigger(false)
                            }
                            else{
                                setTrigger(true)
                            }
                        }}>watch trailer</button>
                    </div>
                    <div className='right-page'>
                        <div className='overview-wrapper'>
                            <h2 className='description-text'>Description</h2>
                            <p className='overview-text'>{movie.overview}</p>
                        </div>
                        <div className='genres-tagline-wrapper'>
                            <div>
                                <h2>Genres</h2>
                                    {
                                        movie.genres?.map((item,idx)=>{
                                            return(
                                                <p key={idx} className="genre-text">
                                                    {item.name}
                                                </p>
                                            )
                                        })
                                    }
                            </div>
                            <div className="tagline-wrapper">
                                <h2>Tagline</h2>
                                <p className='tagline-text'>{movie.tagline}</p>
                            </div>
                        </div>
                        {
                            reviewed === true?
                            <button className='edit-button' onClick={(e)=>navigate(`/edit/${editId}`)} type="button">edit review</button>
                            :<button className='review-button' onClick={(e)=>navigate(`/reviewForm/${id}`)} type="button">Leave a review</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Details;