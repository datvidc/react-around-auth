class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    /* adds a click event listener to the close icon of the popup */
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });


  }
  _handleEscClose(evt) {
    /* logic for closing the popup by pressing the Esc key. */
    if (evt.key === "Escape") {
      this.close();
      evt.stopPropagation();
    }
  }
  open() {
    this._popupElement.classList.add("popup_visible");
    //add event listener for Esc
    this.setEventListeners();


  }


  close() {
    this._popupElement.classList.remove("popup_visible");

    document.removeEventListener("keyup", this._handleEscClose);
    // this listener is not needed in popupwithimage - listener is added to document
    this._popupElement
      .querySelector(".popup__close")
      .removeEventListener("click", this.close);
  }

}


export default Popup;
