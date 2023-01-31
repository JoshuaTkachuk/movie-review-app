import Home from './components/Home';
import Details from './components/Details';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState} from 'react';
import ReviewList from './components/ReviewList';
import Edit from './components/Edit';
import ReviewForm from './components/ReviewForm';
import Search from './components/Search';

function App() {
  const [review, setReview] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' default/>
          <Route element={<Details/>} path='/review/:id'/>
          <Route element={<ReviewList review={review} setReview={setReview}/>} path='reviews'/>
          <Route element={<Edit/>} path='/edit/:id'/>
          <Route element={<ReviewForm review={review} setReview={setReview}/>} path='/reviewForm/:id'/>
          <Route element={<Search/>} path='/search'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
