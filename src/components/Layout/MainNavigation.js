import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import CreateAuth from '../../Store/Create-Auth';



const MainNavigation = () => {
  const authCtx = useContext(CreateAuth);
  const [login, setLogin] = useState(false);

  // console.log(authCtx.tokenStore);
  useEffect(() => {
    setLogin(authCtx.tokenStore.length !==0)
  },)

  const logoutHandler = () => {
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!login && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {login && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {login && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
