import React from 'react';


function InfoToolTip(props) {

    return (

        <div className={`infoToolTip popup_type_${props.name} ${isOpenClass}`}>
        <div className="popup__container">
          <button onClick={props.closeItAll} type="submit" className="popup__close"> </button>
          <form className="popup__edit-form" onSubmit={props.onSubmit}>
            <h3 className="popup__heading"> {props.heading} </h3>
              {props.children}
            <button  type="submit" className="popup__save"> {props.buttonText} </button>
          </form>
        </div>
      </div>

    )

}

