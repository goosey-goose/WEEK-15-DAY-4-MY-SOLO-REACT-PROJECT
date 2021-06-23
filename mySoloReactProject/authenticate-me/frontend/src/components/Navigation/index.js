import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// const { Spot } = require('../../../../backend/db/models');


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);//////////////

  //for carousel
  const sliders = document.querySelector(".carouselBox");
  let scrollPerClick;
  let imagePadding = 20;





  const openMenu = () => { ////////////////////
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => { /////////////////////
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

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
          <Link className="link" exact to="/" style={{ textDecoration: 'none' }}>Home</Link>
          <Link className="link" to="/login" style={{ textDecoration: 'none' }}>Login</Link>
          <Link className="link" to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
        </ul>
        )}
      </>
    );
  }

  // const romeImageLink = 'https://cdn.pixabay.com/photo/2021/04/25/23/17/rome-6207755_960_720.jpg';

  return (
    <>
    <div className="homeDivContainer">
      <img className="homeBackground__romeImage" src="../../images/rome-6207755_1920.jpg"></img>
      <div className="outerGridDiv">
      <div id="eben">
        <button id="homePageButton" onClick={openMenu}>
        <i class="fas fa-globe fa-2x"></i>
        </button>
      </div>
      <div className="carousel">
        <div className="carouselBox">

        </div>
        <a className="switchLeft sliderButton">{'<'}</a>
        <a className="switchRight sliderButton">{'>'}</a>
      </div>
      <div id="ulNavLinkWrapperDiv">

        <ul id="loggedOutNavLinks">
          <li>
            {/* <NavLink exact to="/">Home </NavLink> */}
            {isLoaded && sessionLinks}
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
