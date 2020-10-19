import React from 'react';
import Vector from '../images/Vector.svg';

function Header() {
  return (
  <header className="header">
    <img className="header__logo" src={Vector} alt="Around the US" />
  </header>
  );
}
export default Header;
