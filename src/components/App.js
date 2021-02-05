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
      jwt: null,
      cards: []


    };
    this.handleLogin = this.handleLogin.bind(this);
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
              this.handleInfoToolTip(true);
              this.componentDidMount();
            })
          return res;
        }
        return res.json;
      }).catch((err) => {
        this.handleInfoToolTip(true);
        console.log(err);
      });
  }


  handleLogin(value) {
    this.setState({ isLoggedIn: value });
    this.props.history.push('/');
  }

  handleEmailUpdate(uEmail) {
    this.setState({ userEmail: uEmail })
  }

  handleCardClick = (value) => {
    console.log()
    this.setState({ selectedCard: value });

  }

  handleUpdateAvatar = (link) => {
    this.setState({ currentUser: link })
  }

  handleUpdateUser = (valueArr) => {
    this.setState({ currentUser: valueArr })
    this.handleEmailUpdate(valueArr.email);
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditPicOpen: true });
  }
  handleEditProfileClick = () => {
    this.setState({ isChangePopOpen: true });
  }
  handleInfoToolTip = (value) => {
    this.setState({ isInfoToolTipOpen: true });


  }

  handleAddPlaceClick = () => {
    this.setState({ isAddPopOpen: true });
  }

  handleEditUser = (name, about) => {
    api.updateUser(name, about, this.state.jwt).then((result) => {
      console.log(result);
      this.handleUpdateUser(result.data);
    })
  }
  handleEditAvatar = (url) => {
    api.updateAvatar(url, this.state.jwt).then((res) => {
      this.handleUpdateUser(res.data);
    })

  }

  checkToken = (token) => {
    auth.getCurrentUser(token)
      .then((res) => {
        if (res.data) {
          console.log("res ok")
          this.handleLogin(true);
          this.handleUpdateUser(res.data);
          this.setState({ jwt: token });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSignout = () => {
    localStorage.removeItem("jwt");

    this.setState({
      currentUser: {},
      userEmail: null,
      jwt: "" 
    });
    this.handleLogin(false);


  }


  handleRegister = (userEmail, userPassword) => {
    auth.signUp(userEmail, userPassword)
      .then((res) => {
        console.log(res);
        if (res.data) {
        this.handleEmailUpdate(res.data.email);
        this.handleSignIn(userEmail, userPassword);
        return res.json;
        this.handleInfoToolTip(true);
        }
      }).catch((err) => {
        console.log(err);
        this.handleInfoToolTip(true);
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
    const token = localStorage.getItem('jwt');

    if (token) {

      this.checkToken(token);
      //now for generating cards
      console.log('now for cards');
      api.getInitialCards(token)
        .then(res => {

          this.setState({ cards: res.data });;

        })
    }

  }

  handleCardLike = (card) => {
    console.log(card.likes)
    const isLiked = card.likes.some(i => i === this.state.currentUser._id);

    console.log(card);
    console.log(isLiked);
    api.likeButton(card._id, isLiked, this.state.jwt)
      .then((res) => {
        console.log(res.data._id);

        const newCards = this.state.cards.map((each) => (each._id === card._id) ? res.data : each);


        this.setState({ cards: newCards });

      })
  }


  handleDeleteCard = (card) => {
    //Delete button should not be there if this is not true, but...anyway checking if card is owned by current user
    const cardOwner = card.owner === this.state.currentUser._id;

    if (cardOwner) {
      api.deleteCard(card._id, this.state.jwt).then(() => {
        const newCards = this.state.cards.filter(c => c._id !== card._id);
        this.setState({ cards: newCards });
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  handleAddPlaceSubmit = (name, link) => {
    api.addCard(name, link, this.state.jwt).then((res) => {
      console.log(res);
      this.setState({ cards: [...this.state.cards, res.data] });
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
          <InfoToolTip isOpen={this.state.isInfoToolTipOpen} success={this.state.isLoggedIn} onClose={this.closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}
export default withRouter(App);