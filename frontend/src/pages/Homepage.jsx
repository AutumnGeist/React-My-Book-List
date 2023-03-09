import React from 'react'
import { Link } from "react-router-dom";
import libraryImg from '../images/library.png'
import searchImg from '../images/search2.PNG'
import booklistImg from '../images/booklist2.PNG'
import profileImg from '../images/profile2.PNG'
import decorImg from '../images/decor-short.png'

function Homepage() {
  
  return (
    <div className="container">
      <section className="homepage-heading">
        <h1 className="home-title">My Book List</h1>
        <img src={libraryImg} alt="library img" className="libraryImg" />
        <h3>How many books have you read?</h3>
      </section>
      
      <section className="w-75">
        <div className="home">
          <h3>Easily search for books to add to your list</h3>
          <img src={searchImg} alt="search img" className="home-img" />
        </div>
        <div className="home">
          <h3>Keep track of reading status, pages read, dates, and more</h3>
          <img src={booklistImg} alt="booklist img" className="home-img" />
          
        </div>
        <div className="home">
          <h3>View your reading statistics and favorites in your profile</h3>
          <img src={profileImg} alt="profile img" className="home-img" />
        </div>
        <div className="home centered">
          <h3 className="pb-1">Create an account to get started!</h3>
          <Link to='/register' className="forgotLink registerLink p-5">
              Register
          </Link>
          <img src={decorImg} alt="decor img" className="w-50" />
        </div>
      </section>
    </div>
  )
}

export default Homepage