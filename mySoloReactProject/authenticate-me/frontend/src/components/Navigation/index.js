import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import romeImage from '../../../public/images/rome-6207755_1920.jpg';
// const romeImage = require('/home/eben/appacademyfolder/week15/day4/WEEK-15-DAY-4-MY-SOLO-REACT-PROJECT/mySoloReactProject/authenticate-me/frontend/public/images/rome-6207755_1920.jpg');

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  // const romeImageLink = 'https://cdn.pixabay.com/photo/2021/04/25/23/17/rome-6207755_960_720.jpg';

  return (
    <>
    <div className="homeDivContainer">
      <img className="homeBackground__romeImage" src="../../images/rome-6207755_1920.jpg"></img>
      <div className="outerGridDiv">
      <div id="ulNavLinkWrapperDiv">
        <ul id="loggedOutNavLinks">
          <li>
            <NavLink exact to="/">Home</NavLink>
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
