import React from "react";
import {Link} from 'react-router-dom';
import {BiMoviePlay} from 'react-icons/bi';
import "../styles/Navbar.css"

const Navbar =(props) =>{
    const location = props.location;
    return(
        <div className='navBar'>
                    <div className='nav-left'>
                        <h1 style={{paddingRight:"15px"}}>Movie Critic</h1>
                        <BiMoviePlay size={40}/>
                    </div>
                    <div className='nav-right'>
                        {
                            location==="home"?
                            <Link className='nav-link' style={{color: "white"}} to={'/'}>Home</Link>
                            :<Link className='nav-link' to={'/'}>Home</Link>
                        }
                        {
                            location==="reviews"?
                            <Link className='nav-link' style={{color:"white"}} to={'/reviews'}>My Reviews</Link>
                            :<Link className='nav-link' to={'/reviews'}>My Reviews</Link>
                        }
                        {
                            location==="search"?
                            <Link className='nav-link' style={{color:"white"}} to={'/search'}>Search</Link>
                            :<Link className='nav-link' to={'/search'}>Search</Link>
                        }
                    </div>
                </div>
    )
}
export default Navbar;