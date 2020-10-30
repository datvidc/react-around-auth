import React from 'react';
import Vector from '../images/Vector.svg';

function Header(props) {
  return (
  <header className="header">
    <img className="header__logo" src={Vector} alt="Around the US" />
   
    
    { props.loggedIn &&  
    <p className='header__email'></p>
    }
    <a className="header__signBtn" href="/react-around-auth/signin"> {props.aText} </a>
  
  </header>
  );
}
export default Header;
