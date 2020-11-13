import React from 'react';

function PopupWithForm (props) {
  const isOpenClass = props.isOpen ? "popup_visible" : "";

/*
need:
props.isOpen (is popup open)
props.name (name of className)
props.heading (popup heading)
props.children (actual form)
props.buttonText (save button text)
props.closeItAll (close all popups):
props.onSubmit 
 */

  return(



  <div className={`popup popup__${props.name} ${isOpenClass}`}>
    <div className={props.noButton ? "popup__checkMark" : "popup__container" } >
      <button onClick={props.closeItAll} type="submit" className="popup__close"> </button>
      <form className="popup__edit-form" onSubmit={props.onSubmit}>
        <h3 className="popup__heading"> {props.heading} </h3>
          {props.children}
        { !props.noButton && <button  type="submit" className="popup__save"> {props.buttonText} </button>  }
        
      </form>
    </div>
  </div>
  );



}

export default PopupWithForm;
