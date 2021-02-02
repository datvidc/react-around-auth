import React from 'react';
import Vector from '../images/Vector.svg';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">



      { props.loggedIn ? '<img className="header__logo utils__is-hiden" src={Vector} alt="Around the US"' : '<img className="header__logo" src={Vector} alt="Around the US" />'
      };

      { props.loggedIn &&
        <p className='header__email'></p>
      },

      { props.loggedIn ? '<Link to={props.link} onclick={props.logout} className="header__signBtn" > {props.aText} </Link>' : '<Link to={props.link} className="header__signBtn" > {props.aText} </Link>'
      };



    </header>
  );
}
export default Header;
