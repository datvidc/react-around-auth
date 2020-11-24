import React from 'react';
import successIcon from '../images/successIcon.png';
import failureIcon from '../images/failureIcon.png';
import PopupWithForm from './PopupWithForm';



function InfoToolTip(props) {
    const message = props.success ? "Success! You have now been registered." : "Oops, something went wrong! Please try again.";

    const icon = props.success ? successIcon : failureIcon;

    const handleClosePopup = (e) => {
        e.preventDefault();
        props.onClose();
    }

    return (

        <>
            <PopupWithForm noButton="true" name="infoToolTip" isOpen={props.isOpen} closeItAll={handleClosePopup} >
                <div className="popup__infoToolTip">
                    <img
                        className="popup__successIcon"
                        src={icon}
                        alt="CheckMark"
                    />
                    <h2 className="popup__message" > {message} </h2>
                </div>
            </PopupWithForm>

        </>

    )

}

export default InfoToolTip;

