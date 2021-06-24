import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import './Navigation.css';
// const { Spot } = require('../../../../backend/db/models');


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);//////////////
  const [isLoginFormPage, setIsLoginFormPage] = useState(false);
  const [isSignupFormPage, setIsSignupFormPage] = useState(false);
  console.log("eben 1");


  //for carousel
  // const sliders = useRef();
  let sliders = document.querySelector(".carouselBox");
  let scrollPerClick;
  let scrollAmount = 0;

  function sliderScrollLeft() {
    console.log("hello");
    sliders.scrollTo({
      top: 0,
      left: (scrollAmount -= scrollPerClick),
      behavior: "smooth"
    });

    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
  }

  function sliderScrollRight() {
    console.log("goodbye");
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
      sliders.scrollTo({
        top: 0,
        left: (scrollAmount += scrollPerClick),
        behavior: "smooth"
      });
    }
  }

  scrollPerClick = 400;

  // TESTING FETCHING DB DATA//
  async function getAllSpots() {
    const sliders = document.querySelector(".carouselBox");
    const fetchingData = await fetch("http://localhost:3000/api/users/eben");
    const data = await fetchingData.json();

    data.map((image, index) => {
      sliders.insertAdjacentHTML(
        "beforeend",
        `<img class="img-${index} slider-img" src="${image.url}" />`
      )
    });

    scrollPerClick = 400;
  }

  // getAllSpots();




  const openMenu = () => { ////////////////////
    console.log(showMenu);
    if (showMenu) return;
    setShowMenu(true);
  };







  useEffect(() => { /////////////////////
    // console.log("eben 2");
    getAllSpots();
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  function showLoginPage() {
    if (isSignupFormPage) {
      setIsSignupFormPage(false)
    }
    setIsLoginFormPage(true);
  }

  function showSignupPage() {
    if (isLoginFormPage) {
      setIsLoginFormPage(false)
    }
    setIsSignupFormPage(true)
  }

  function showHomePage() {
    if (isLoginFormPage || isSignupFormPage) {
      setIsLoginFormPage(false);
      setIsSignupFormPage(false);
    }
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <div id="eben">
        <button id="homePageButton" onClick={openMenu}>
        <i class="fas fa-globe"></i>
        </button>
        </div> */}
        {showMenu && (
        <ul className="profile-dropdown">
          <Link className="link" exact to="/" style={{ textDecoration: 'none' }} onClick={showHomePage}>Home</Link>
          <Link className="link" to="/login" style={{ textDecoration: 'none' }} onClick={showLoginPage}>Login</Link>
          <Link className="link" to="/signup" style={{ textDecoration: 'none' }} onClick={showSignupPage}>Sign Up</Link>
        </ul>
        )}
      </>
    );
  }



  let loginComponent = <LoginFormPage />;
  let signupComponent = <SignupFormPage />;



  return (
    <>
    <div className="homeDivContainer">
      <img className="homeBackground__romeImage" src="../../images/rome-6207755_1920.jpg"></img>
      <div className="outerGridDiv">
      <div id="medieval-name-logo">
      <i class="fas fa-chess-rook"></i>
        <text>medievalbnb</text>
      </div>
      <div id="eben">
        <button id="homePageButton" onClick={openMenu}>
        <i class="fas fa-globe fa-2x"></i>
        </button>
      </div>
      {isLoginFormPage && loginComponent}
      {isSignupFormPage && signupComponent}
      <div className="logout-button-div">
      {isLoaded && sessionLinks}
      </div>
      {/* {isLoaded && sessionLinks} */}
      <div className="carousel">
        <div className="carouselBox">

        </div>
        <a className="switchLeft sliderButton" onClick={sliderScrollLeft}>{'<'}</a>
        <a className="switchRight sliderButton" onClick={sliderScrollRight}>{'>'}</a>
      </div>
      <div id="ulNavLinkWrapperDiv">

        <ul id="loggedOutNavLinks">
          <li>
            {/* <NavLink exact to="/">Home </NavLink> */}
            {/* {isLoaded && sessionLinks} */}
          </li>
        </ul>
        </div>
      </div>
    </div>
    <div className="test"></div>
    </>
  );
}

export default Navigation;
