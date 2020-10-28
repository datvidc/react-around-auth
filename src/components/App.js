import React from 'react';
import { Switch, Route, useHistory, withRouter } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditPicOpen: false,
      isDeletePopOpen: false,
      isChangePopOpen: false,
      isAddPopOpen: false,
      isImagePopOpen: false,
      selectedCard: "",
      currentUser: {}, //name: "Lacking Gravitas", about: "SPaceSHip", avatar: defaultAvatarPicture
      cards: [],
      loggedIn: false
      
    };
  }

  handleLogin = (value) => {
    this.setState({ loggedIn: value });
  }

  handleCardClick = (value) => {
    this.setState({ selectedCard: value });

  }

  handleUpdateAvatar = (link) => {
    this.setState({ currentUser: link })
  }

  handleUpdateUser = (valueArr) => {
    this.setState({ currentUser: valueArr })
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditPicOpen: true });
  }
  handleEditProfileClick = () => {
    this.setState({ isChangePopOpen: true });
  }

  handleAddPlaceClick = () => {
    this.setState({ isAddPopOpen: true });
  }

  handleEditUser = (name, about) => {
    api.updateUser(name, about).then((result) => {
      this.handleUpdateUser(result);
    })
  }
  handleEditAvatar = (url) => {
    api.updateAvatar(url).then((res) => {
      this.handleUpdateUser(res);
    })

  }



  closeAllPopups = () => {
    this.setState({
      isEditPicOpen: false,
      isDeletePopOpen: false,
      isChangePopOpen: false,
      isAddPopOpen: false,
      isImagePopOpen: false,
      selectedCard: ""
    })
  }

  componentDidMount() {
    api.getUser()
      .then(res => {
        this.handleUpdateUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //now for generating cards
    api.getInitialCards()
      .then(res => {
        let initialCards = [];
        res.forEach((card) => {
          initialCards.push(card);
        });
        this.setState({ cards: initialCards });
      })

  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
    api.likeButton(card, isLiked).then((res) => {
      const newCards = this.state.cards.map((card) =>
        res._id === card._id ? res : card);
      this.setState({ cards: newCards });
    })
  }

  handleDeleteCard = (card) => {
    //Delete button should not be there if this is not true, but...anyway checking if card is owned by current user
    const cardOwner = card.owner._id === this.state.currentUser._id;

    if (cardOwner) {
      api.deleteCard(card._id).then(() => {
        const newCards = this.state.cards.filter(c => c._id !== card._id);
        this.setState({ cards: newCards });
      })
    }
  }

  handleAddPlaceSubmit = (name, link) => {
    api.addCard(name, link).then((res) => {
      this.setState({ cards: [...this.state.cards, res] });
    })
  }

  render() {
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Switch >
            <Route path="/signin">
            <Header />
            <Main onCardClick={this.handleCardClick} onAvatarClick={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlaceClick={this.handleAddPlaceClick} cards={this.state.cards} onCardLike={this.handleCardLike} onCardDelete={this.handleDeleteCard} />
              
            </Route>
            <Route path="/signup">
              <Header />
            </Route>
            <ProtectedRoute path="/" loggedIn={this.state.loggedIn} component={Main} >
              <Header />
              <Main onCardClick={this.handleCardClick} onAvatarClick={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlaceClick={this.handleAddPlaceClick} cards={this.state.cards} onCardLike={this.handleCardLike} onCardDelete={this.handleDeleteCard} />
            </ProtectedRoute>
          </Switch>
          <Footer />

          <EditAvatarPopup isOpen={this.state.isEditPicOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleEditAvatar} />

          <PopupWithForm name="delete-confirm" isOpen={this.state.isDeletePopOpen} heading="Are you sure ?" buttonText="Yes" closeItAll={this.closeAllPopups} >
          </PopupWithForm>

          <EditProfilePopup isOpen={this.state.isChangePopOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleEditUser} />

          <AddPlacePopup isAddPopOpen={this.state.isAddPopOpen} closeAllPopups={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />



          <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}>
          </ImagePopup>
        </CurrentUserContext.Provider>
      </div>
    );
  }
}
export default App;