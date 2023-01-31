import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import instance from '../axios';
import '../styles/Home.css'
import '../styles/ReviewList.css'
import StarRatingComponent from 'react-star-rating-component';
import { BsFillStarFill } from "react-icons/bs";
import Navbar from './Navbar';

const ReviewList=(props)=>{
    const {review, setReview} = props;
    const navigate = useNavigate();
    const base_url = "https://image.tmdb.org/t/p/original";
    useEffect(() =>{
        axios.get("https://movie-review-app-mern.herokuapp.com/api/review")
            .then(result =>{
                setReview(result.data)
                console.log(result.data)
            })
            .catch(err => console.log(err))
    }, [])
    const deleteItem=(itemId)=>{
        axios.delete('https://movie-review-app-mern.herokuapp.com/api/delete/' + itemId)
                .then(result =>{
                    setReview(review.filter(review => review._id != itemId))
                })
                .catch(err => console.log(err))
    }
    return(
        <div className='wrapper'>
            <Navbar location='reviews'/>
            <div className='review-list-wrapper'>
                    {
                        review.length > 0?
                        <div className='list-wrapper'>
                            {
                                review.map((item,index)=>{
                                    return <div key={index} className='review-wrapper'>
                                        <img onClick={(e)=>{navigate(`/review/${item.movieId}`)}} className='movie-img' src={`${base_url}${item.poster}`} alt=''></img>
                                        <div className='review'>
                                            <div className='info'>
                                                <h2 style={{color:'white', textAlign:'left', margin:0, marginTop:5}}>{item.title}</h2>
                                                <div className='star'>
                                                    <StarRatingComponent editing={true} name={"stars"} starCount={5} value={item.rating} renderStarIcon={() => <BsFillStarFill style={{padding:2}}/>}/>
                                                </div>
                                                <p className='review-comment'>{item.comment}</p>
                                            </div>
                                            <div className='buttons'>
                                                <button className='edit-btn' onClick={(e)=> navigate(`/edit/${item._id}`)}>Edit</button>
                                                <button className='delete-btn' onClick={(e) => deleteItem(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        : <p style={{color:"white"}}>Looks like you've got no reviews</p>
                    }
            </div>
        </div>
    )
}

export default ReviewList