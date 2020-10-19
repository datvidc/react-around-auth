/* ###############################################################
                Importing local images
############################################################### */

import lakeLouise from "../../images/Lake-louise.png";
import yosemite from "../../images/yosemite.png";
import islandsBrygge from "../../images/islandsBrygge.png";
import latemar from "../../images/latemar.png";
import stroeget from "../../images/stroeget.png";
import copenhagen from "../../images/Copenhagen.png";


/* ###############################################################
                variables:
############################################################### */
export const edit = document.querySelector(".profile__edit");
export const modal = document.querySelector(".popup__changetext");
export const popClose = document.querySelector(".popup__close");
export const profileName = document.querySelector(".profile__name");
export const profileTitle = document.querySelector(".profile__title");
export const popupTitle = document.querySelector(".popup__title");
export const popupName = document.querySelector(".popup__name");
export const addCardBtn = document.querySelector(".popup__addcard");
export const btnAddCard = document.querySelector(".profile__add");
export const closeAddCard = document.querySelector(".popup__close_addcard");
export const saveaddcard = document.querySelector(".popup__addcard");
export const popupurl = document.querySelector(".popup__url");
export const placename = document.querySelector(".popup__place");
export const popEditForm = document.querySelector(".popup__edit-form_add");
export const imgpop = document.querySelector(".popup__img");
export const closeimg = document.querySelector(".popup__closeimg");
export const elementsContainer = document.querySelector(".elements__list");
export const deleteButton = document.querySelector(".popup__delete");
export const profilePic = document.querySelector(".profile__avatar-overlay");
export const editProfilePic = document.querySelector(".popup__edit-picture");

/* ############################################################
STARTUP CODE
############################################################### */

/* starting cards */
export const initialCards = [{
    name: "Lake Louise",
    link: lakeLouise,
    alt: "Idylic picture of Lake Louise"
  },
  {
    name: "Yosemite Valley",
    link: yosemite,
    alt: "YoseMite Valley from a birds eye perspective- hovering over a lake"
  },
  {
    name: "Islands Brygge",
    link: islandsBrygge,
    alt: "Moody harbour picture - looking out on the sail boats"
  },
  {
    name: "Latemar",
    link: latemar,
    alt: "Latemar nature pic- nature Picture"
  },
  {
    name: "Strøget",
    link: stroeget,
    alt: "Largest European pedestrian shopping street, and one of the oldest- Strøget shot from birds eye view"
  },
  {
    name: "Copenhagen",
    link: copenhagen,
    alt: "Rooftops of Copenhagen- moody- rainy - old but classic"
  }
];

//validation setting object
export const enableValidation = {
  formSelector: ".popup__edit-form",
  inputSelector: ".popup__edit",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__edit_invalid",
  errorClass: "popup__edit_error"
};
export const enableValidationPicture = {
  formSelector: ".popup__edit-picture",
  inputSelector: ".popup__edit",
  submitButtonSelector: ".popup__userImg",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__edit_invalid",
  errorClass: "popup__edit_error"
}

export const enableValidationAddCard = {
  formSelector: ".popup__edit-form_add",
  inputSelector: ".popup__edit",
  submitButtonSelector: ".popup__save_addcard",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__error-input",
  errorClass: "popup__edit_error"
}
