import React from 'react';
import successIcon from '../images/successIcon.png';
import failureIcon from '../images/failureIcon.png';
import PopupWithForm from './PopupWithForm';



function InfoToolTip(props) {
    const message = props.success ? "Success! You have now been registered." : "Oops, something went wrong! Please try again.";

    const icon = props.success ? successIcon : failureIcon ;

    return (

    <>
        <PopupWithForm noButton="true"  name="infoToolTip" isOpen={props.isOpen} closeItAll={props.onClose} >
            <img 
                className="popup__successIcon"
                src={icon}
                alt="CheckMark"
            />
            <h2> {message} </h2>
        
        </PopupWithForm>

    </>
    
    )

}

export default InfoToolTip;

