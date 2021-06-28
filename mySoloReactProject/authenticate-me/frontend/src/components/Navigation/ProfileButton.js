import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDeleteUser } from "../../store/session";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const deleteUserProfile = (e) => {
    logout(e);
    dispatch(getDeleteUser({userId: user.id}));
  }

  return (
    <>
      {/* <button onClick={openMenu}>
      <i class="fas fa-coffee"></i>
      </button> */}
      {/* <button onClick={logout}>Log Out</button> */}
      <Link className="link" id="profile-logout-link" exact to="/" style={{ textDecoration: 'none' }} onClick={logout}>Log Out</Link>
      <Link className="link" id="delete-account-link" exact to="/" style={{ textDecoration: 'none' }} onClick={deleteUserProfile}>Delete My Account</Link>
      {/* {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )} */}
      {/* <div id="logged-in-username-div">
        {user.username}
      </div> */}
    </>
  );
}

export default ProfileButton;
