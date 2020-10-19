import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function AddPlacePopup(props) {

	const [placeName, setPlaceName] = React.useState("Name of place");
	const [url, setUrl] = React.useState("Link to image");
	
	function handlePlaceChange(e) {
		setPlaceName(e.target.value);
	}

	function handleUrlChange(e) {
		setUrl(e.target.value);
	}

	function onAddPlaceSubmit (e) {
		e.preventDefault();
		props.onAddPlace(placeName, url);
		props.closeAllPopups();
	}

	return (

		<PopupWithForm name="addcard" isOpen={props.isAddPopOpen} heading="New place" buttonText="Create" closeItAll={props.closeAllPopups} onSubmit={onAddPlaceSubmit}>
			<label className="popup__label-group ">
				<input id="form-title" type="text" minLength={2} maxLength={40} placeholder="Title" className="popup__edit_invalid popup__edit popup__place popup_head" name="placename" required onChange={handlePlaceChange}/>
				<span id="form-title--error" className="popup__error-input popup__place-error"> Please fill out this field.</span>
			</label>
			<label className="popup__label-group">
				<input id="form-link" type="url" placeholder="Image link" className="popup__edit_invalid popup__edit popup__url popup_detail" name="popupurl" required onChange={handleUrlChange}/>
				<span id="form-link--error" className="popup__error-input popup__url_error">Please enter a web address.</span>
			</label>
		</PopupWithForm>
	)
}

export default AddPlacePopup;