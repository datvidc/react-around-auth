import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescChange(e) {
        setDescription(e.target.value);
        
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, description);
        props.onClose();
    }
 
    return (

        <PopupWithForm name="changetext" isOpen={props.isOpen} heading="Edit profile" buttonText="Save" closeItAll={props.onClose} onSubmit={handleEditFormSubmit} >
        <label className="popup__label-group">
          <input value={name || ""} onChange={handleNameChange} id="form-name" type="text" minLength={2} maxLength={40} required pattern="[A-Za-z -]{2,40}" className="popup__edit popup__name popup_head" name="ProfileName" />
          <span id="form-name--error" className="popup__edit_error popup__name-error" />
        </label>
        <label className="popup__label-group">
          <input value={description || ""} onChange={handleDescChange} id="form-status" type="text" minLength={2} maxLength={200} required  className="popup__edit popup__title popup_detail" name="profileTitle" />
          <span id="form-status--error" className="popup__edit_error popup__title-error" />
        </label>
      </PopupWithForm>
    )
}


export default EditProfilePopup;