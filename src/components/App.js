import React from 'react';
import { Switch, Route, Link, Redirect, useHistory, withRouter } from 'react-router-dom';
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
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import auth from '../utils/auth';

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isInfoToolTipOpen: false,
      isEditPicOpen: false,
      isDeletePopOpen: false,
      isChangePopOpen: false,
      isAddPopOpen: false,
      isImagePopOpen: false,
      selectedCard: "",
      currentUser: {}, //name: "Lacking Gravitas", about: "SPaceSHip", avatar: defaultAvatarPicture, _id" some id.
      isLoggedIn: false,
      userEmail: null,
      cards: []


    };
    this.handleLogin = this.handleLogin.bind(this);
  }




  handleLogin(value) {

    this.setState({ isLoggedIn: value });
    this.props.history.push('/');
  }

  handleEmailUpdate(uEmail) {
    this.setState({ userEmail: uEmail })
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
  handleInfoToolTip = () => {
    this.setState({ isInfoToolTipOpen: true });
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

  checkToken = (token) => {
    auth.getCurrentUser(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSignout = () => {
    localStorage.removeItem("jwt");
    this.handleLogin(false);
  }

  handleSignIn = (userEmail, userPassword) => {
    auth.signIn(userEmail, userPassword)
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          this.handleLogin(true);
          auth.getCurrentUser(res.token)
            .then((res) => {
              this.handleUpdateUser(res.data)
            })
          return res;
        }
        return res.json;
      }).catch((err) => {
        console.log(err);
      });
  }

  handleRegister = (userEmail, userPassword) => {
    auth.signUp(userEmail, userPassword)
      .then((res) => {
        console.log(res);
        this.handleEmailUpdate(res.data.email);
        this.handleSignIn(userEmail, userPassword);
        return res.json;
      }).catch((err) => {
        console.log(err);
      });

  }
  closeAllPopups = () => {
    this.setState({
      isInfoToolTipOpen: false,
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
              <Header link={"/signup"} aText={"Sign Up"} loggedIn={this.state.loggedIn} />
              <Login isOpen={this.state.isInfoToolTipOpen} onClose={this.closeAllPopups} onSignIn={this.handleSignIn} />
            </Route>
            <Route path="/signup">
              <Header link={"/signin"} aText={"Log In"} loggedIn={this.state.loggedIn} />
              <Register isOpen={this.state.isInfoToolTipOpen} onClose={this.closeAllPopups} onRegister={this.handleRegister} />

            </Route>
            <ProtectedRoute path="/" loggedIn={this.state.isLoggedIn} onCardClick={this.handleCardClick} onAvatarClick={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlaceClick={this.handleAddPlaceClick} cards={this.state.cards} onCardLike={this.handleCardLike} onCardDelete={this.handleDeleteCard} logout={this.handleSignout} aText={"Log Out"} component={Main} />
            <Footer />
          </Switch>


          <EditAvatarPopup isOpen={this.state.isEditPicOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleEditAvatar} />

          <PopupWithForm name="delete-confirm" isOpen={this.state.isDeletePopOpen} heading="Are you sure ?" buttonText="Yes" closeItAll={this.closeAllPopups} >
          </PopupWithForm>

          <EditProfilePopup isOpen={this.state.isChangePopOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleEditUser} />

          <AddPlacePopup isAddPopOpen={this.state.isAddPopOpen} closeAllPopups={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />
          <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}>
          </ImagePopup>
          <InfoToolTip isOpen={this.state.isInfoToolTipOpen} success={"true"} onClose={this.closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}
export default withRouter(App);