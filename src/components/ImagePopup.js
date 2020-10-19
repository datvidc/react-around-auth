import React from 'react';

function ImagePopup(props) {
  const isOpenClass = props.card ? "popup_visible" : "";
 
  return (

    <div className={`popup popup__img ${isOpenClass}`} >
      <div className="popup__card popup_image">
        <button type="submit" onClick={props.onClose} className="popup__close popup__closeimg"> </button>
        <img src={props.card && props.card.link} alt={props.card.name} className="popup__image popImg" />
        <p className="popup__imgtext">{props.card.name} </p>
      </div>
    </div>

  )
}

export default ImagePopup;

