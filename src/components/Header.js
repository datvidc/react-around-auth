import React from 'react';
import Vector from '../images/Vector.svg';
import { Link } from "react-router-dom";

function Header(props) {
  return (
<header className={ (props.loggedIn ? "header--signedIn" : "header")} >


    {/* fire if user is logged in */ }
      { props.loggedIn &&
    
        <div className="header--flex">
          <p className='header__email header__signBtn'>{props.userEmail} </p>
          <Link to={props.link} onClick={props.logout} className="header__signBtn--signedIn" > {props.aText} </Link>
        </div>
     
      }
{/* fire if user is NOT logged in */}

      {!props.loggedIn &&
        <>

          <img className="header__logo" src={Vector} alt="Around the US" />

          <Link to={props.link} className="header__signBtn" > {props.aText} </Link>
        </>
      }

</header>

    
  );
}
export default Header;
