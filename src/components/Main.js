import React from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';
import Header from './Header';

function Main(props) {


  const currentUser = React.useContext(CurrentUserContext);



  return (
    <main>
      <Header link={"/"} userEmail={currentUser.email} loggedIn={props.loggedIn} logout={props.logout} aText={"Log Out"} />
      <section className="profile">
        <div className="profile__avatar-overlay" onClick={props.onAvatarClick}>
          <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
          <div className="profile__avatar-hover" />
        </div>
        <div className="profile__text">
          <div className="profile__namebox">
            <p className="profile__name"> {currentUser.name} </p>
            <button className="profile__edit" onClick={props.onEditProfile} />
          </div>
          <p className="profile__title"> {currentUser.about} </p>
        </div>
        <button className="profile__add" onClick={props.onAddPlaceClick}> </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card, index) => (
            <Card key={index} card={card} onImgClick={props.onCardClick} onDelete={props.onCardDelete} onLike={props.onCardLike} />
          ))}
        </ul>
      </section>
      <Footer />
    </main>


  );
}

export default Main;
