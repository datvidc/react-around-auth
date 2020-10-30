import React from 'react';
import Vector from '../images/Vector.svg';

function Header(props) {
  return (
  <header className="header">
    <img className="header__logo" src={Vector} alt="Around the US" />
   <div className="header__loginMenu">
    {if (props.userEmail) { 
    <p className='header__email'> </p>
    }}
    <button className="header__signBtn"></button>
  </div> 
  </header>
  );
}
export default Header;
