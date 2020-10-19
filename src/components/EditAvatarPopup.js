import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

     // use the context after import. CurrentUserContext
     const currentUser = React.useContext(CurrentUserContext);
     React.useEffect(() => {
        setavatarUrl(currentUser.avatar);
      }, [currentUser]);
    const [avatarUrl, setavatarUrl] = React.useState(currentUser.avatar);

    //Introducing Ref of avatarUrl...
    const avatarValue = React.useRef();


    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarValue.current.value);

        avatarValue.current.value = null;
        props.onClose();

    }

    return (

        <PopupWithForm name="edit-picture" isOpen={props.isOpen} heading="Change profile picture" buttonText="Yes" closeItAll={props.onClose} onSubmit={handleSubmit} >
				<label className="popup__label-group">
				  <input ref={avatarValue} id="user-link" type="url" placeholder={avatarUrl} className="popup__edit_invalid popup__edit popup__url popup_detail " name="imgUrl" required />
					<span id="user-link--error" className="popup__error-input popup__url_error">Please enter a URL.</span>
				</label>
		</PopupWithForm>
    )


}

export default EditAvatarPopup;