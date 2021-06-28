import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import ConfirmedBookingsDiv from '../ConfirmedBookingsDiv';
import { getBooking } from '../../store/booking';
import { getNewBooking } from '../../store/booking';
import './Navigation.css';
// const { Spot } = require('../../../../backend/db/models');


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const reduxStateObject = useSelector(state => state);
  const [showMenu, setShowMenu] = useState(false);//////////////
  const [isLoginFormPage, setIsLoginFormPage] = useState(false);
  const [isSignupFormPage, setIsSignupFormPage] = useState(false);
  // const [spotNumberForUpdate, setSpotNumberForUpdate] = useState(800);
  // let myDate = new Date();
  // console.log(myDate.getMonth(), myDate.getDate(), myDate.getFullYear());
  // console.log(sessionUser);
  const dispatch = useDispatch();


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
        `<img class="img-${index} slider-img" src="${image.url}" alt="${index + 1}" />`
      );
    });

    let carouselImages = document.querySelector(".carouselBox").childNodes;

    let htmlForSpotMenu = `<label for="start">From:</label>

    <input type="date" id="start" name="trip-start"
           value="2018-07-22"
           min="2018-01-01" max="2018-12-31">

           <label for="end">To:</label>

    <input type="date" id="end" name="trip-start"
          value="2018-07-22"
          min="2018-01-01" max="2018-12-31">`;

    let spotButtonDivHTML = `<div id="book-it-button-div">
    <div id="book-thy-kingdom-div">
      BOOK THY KINGDOM!
    </div>
    <button id="booking-button">
    <i class="fab fa-fort-awesome-alt"></i>
  </button>
  </div>`;



    carouselImages.forEach((image) => {
      image.addEventListener("click", (event) => {
        receiveAltImageValue(event.target.alt);
        // setSpotNumberForUpdate(event.target.alt);
        // console.log(event.target.alt);
        let displaySpotDiv = document.getElementById("display-selected-spot-div");
        displaySpotDiv.innerHTML = `<img src='${event.target.currentSrc}' />`;
        let outerDisplaySpotDiv = document.getElementById("outer-display-spot-menu");
        outerDisplaySpotDiv.innerHTML = `<div id="display-spot-menu">${htmlForSpotMenu}</div>${spotButtonDivHTML}`;
        let bookingButton = document.getElementById("booking-button");
        bookingButton.addEventListener("click", () => {
          createNewBooking();
        })
      });
    });

    scrollPerClick = 400;
  }


  let altImageValue;
  const receiveAltImageValue = (value) => {
    altImageValue = value;
  }




  /////// EBEN CREATE NEW BOOKING
  const createNewBooking = () => {
    dispatch(getNewBooking({
      spotId: altImageValue,
      userId: "1",
      startDate: "2022-1-2",
      endDate: "2022-1-9"
    })).catch((error) => console.log(error));
  }




  const openMenu = () => { ////////////////////
    console.log(reduxStateObject);
    // console.log(sessionUser);
    // console.log(showMenu);
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

    // dispatch(getBooking(sessionUser.id)).catch((error) => console.log(error));

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
  let confirmedBookingsComponent = <ConfirmedBookingsDiv />



  return (
    <>
    <div className="homeDivContainer">
      <img className="homeBackground__romeImage" src="../../images/rome-6207755_1920.jpg"></img>
      <div className="outerGridDiv">
      <div id="outer-display-spot-menu">

      </div>
      <div id="outer-display-selected-spot-div">
      <div id="display-selected-spot-div">

      </div>
      </div>
      {sessionUser && confirmedBookingsComponent}
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
    <div id="test"></div>
    </>
  );
}

export default Navigation;
