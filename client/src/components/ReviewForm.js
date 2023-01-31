import React, {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import instance from '../axios';
import axios from 'axios';
import Navbar from './Navbar';
import StarRatingComponent from 'react-star-rating-component';
import { BsFillStarFill } from "react-icons/bs";
import '../styles/ReviewForm.css'

const ReviewForm=(props)=>{

    const {id} = useParams();
    const {review, setReview} = props;
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [trailer,setTrailer] = useState('');
    const [errors, setErrors] = useState([]);
    const [movie, setmovie] = useState({});
    const navigate = useNavigate();
    const base_url = "https://image.tmdb.org/t/p/original";
    
    const starClicked = (nextValue,prevValue,name)=>{
        setRating(nextValue);
    }

    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            console.log(result.data)
            setmovie(result.data)
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

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("https://movie-review-app-mern.herokuapp.com/api/review",{title: movie.title,rating,comment,poster: movie.poster_path,trailer, desc: movie.overview, movieId: movie.id})
        .then(result =>{
            console.log(result.data)
            setReview([...review, result.data])
            console.log(review)
            navigate(`/reviews`);
        })
        .catch(err => {
            console.log(err)
            const errArr =[];
            const errResponse = err.response.data.errors;
            for(const key of Object.keys(errResponse)){
                errArr.push(errResponse[key].message)
            }
            setErrors(errArr);
        })
        setComment('');
    }
    
    return<div className='wrapper'>
        <Navbar/>
            <form className='form-wrapper' onSubmit={handleSubmit}>
                <h2 className='review-text'>What did you think?</h2>
                <div className='form'>
                    <textarea placeholder='Leave A Review' className='text-area' onChange={(e)=>{setComment(e.target.value)}}/>
                    <StarRatingComponent editing={true} name={"stars"} starCount={5} value={rating} onStarClick={starClicked} renderStarIcon={() => <BsFillStarFill style={{padding:5}} size={"59px"}/>}/>
                </div>
                <input className='submit-btn' type={'submit'}></input>
                {errors.map((err, index) =><p style={{color:"red"}} key={index}>{err}</p>)}
            </form>
    </div>
}
export default ReviewForm