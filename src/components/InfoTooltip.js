import React from 'react';
import successIcon from '../images/successIcon.png';
import failureIcon from '../images/failureIcon.png';
import PopupWithForm from './PopupWithForm';



function InfoToolTip(props) {
    const message = props.success ? "Success! You have now been registered." : "Oops, something went wrong! Please try again.";

    const icon = props.success ? successIcon : failureIcon ;

    return (

    <>
        <PopupWithForm noButton="true" name="infoToolTip" isOpen={props.isOpen} heading="Edit profile" buttonText="Save" closeItAll={props.onClose} >

        </PopupWithForm>

    </>
    
    )

}

export default InfoToolTip;

