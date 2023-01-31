import React from 'react';
import '../styles/Home.css'
import '../components/MovieRow';
import MovieRow from '../components/MovieRow';
import Navbar from './Navbar';

const Home = () =>{
    return(
        <div className='wrapper'>
            <Navbar location="home"/>
            <div className='page'>
                <MovieRow searchValue="top_rated" title="Top Rated" id={1}/>
                <MovieRow searchValue="popular" title="Popular" id={2}/>
                <MovieRow searchValue="upcoming" title="Upcoming" id={3}/>
            </div>
        </div>
    )
}
export default Home