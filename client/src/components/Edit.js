import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Youtube from 'react-youtube';
import StarRatingComponent from 'react-star-rating-component';
import { BsFillStarFill } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi"
import Navbar from './Navbar';
const Edit=() =>{
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [poster, setPoster] = useState('');
    const [trailer,setTrailer] = useState('');
    const [errors, setErrors] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original";
    const navigate = useNavigate();
    const opts = {
        heigth:"400",
        width: "100%",
        playerVars:{
            
        }
    }
    const starClicked = (nextValue,prevValue,name)=>{
        setRating(nextValue);
    }
    useEffect(()=>{
        axios.get("https://movie-review-app-mern.herokuapp.com/api/review/" + id)
        .then(result =>{
            console.log(result.data)
            setTitle(result.data.title)
            setRating(result.data.rating)
            setComment(result.data.comment)
            setPoster(result.data.poster)
            setTrailer(result.data.trailer)
        })
        .catch(err => console.log(err))
    },[errors])
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put("https://movie-review-app-mern.herokuapp.com/api/edit/" + id, {title,rating,comment,poster,trailer})
        .then(result =>{
            console.log(result.data)
            navigate(`/reviews`);
        })
        .catch(err =>{
            console.log("=======")
                console.log(err.response.data.errors)
                console.log(rating)
                const errArr = [];
                const errResponse = err.response.data.errors;
                for(const key of Object.keys(errResponse)){
                    errArr.push(errResponse[key].message)
                }
                setErrors(errArr);
        })
        setTitle("")
        setRating("")
        setComment("")
        setPoster("")
        setTrailer("")
    }
    return(
        <div className='wrapper'>
            <Navbar/>
            <form className='form-wrapper' onSubmit={handleSubmit}>
                <h2 className='review-text'>What did you think?</h2>
                <div className='form'>
                    <textarea value={comment} className='text-area' onChange={(e)=>{setComment(e.target.value)}}/>
                    <StarRatingComponent editing={true} name={"stars"} starCount={5} value={rating} onStarClick={starClicked} renderStarIcon={() => <BsFillStarFill style={{padding:5}} size={"59px"}/>}/>
                </div>
                <input className='submit-btn' type={'submit'}></input>
                {errors.map((err, index) =><p style={{color:"red"}} key={index}>{err}</p>)}
            </form>
        </div>
    )
}
export default Edit