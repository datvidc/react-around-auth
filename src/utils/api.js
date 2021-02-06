class Api {
  constructor(url,) {
    this._startUrl = url;


  }

  getUser() {
    const userUrl = this._startUrl.concat("group-1/users/me");
    return this._makeRequests(userUrl);
  }

  updateUser(name, about, token) {
    console.log("called it");
    const updateMe = this._startUrl.concat("/users/me");
    return fetch(updateMe, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      }).catch(res => {
        console.log(res);
      })
  }

  updateAvatar(link, token) {
    const newPic = this._startUrl.concat("/users/me/avatar");
    return fetch(newPic, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      }).catch(res => {
        console.log(res);
      })
  }



  _makeRequests(url) {
    return fetch(url, this._header)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`ERROR: ${res.status}`);
        }
      }).catch(res => {
        console.log(res);
      })
  }

  deleteCard(cardID, token) {
    const killUrl = this._startUrl.concat("/cards/" + cardID);
    console.log(cardID);
    return fetch(killUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        if (res.ok) {

          return res.json();
        }
      }).catch(res => {
        console.log(res);
      })
    // call it like this>
    /* api.deleteCard("5f1203c38b2c57001f1475ca"); */
  }

  addCard(name, link, token) {
    const addUrl = this._startUrl.concat("/cards");
    return fetch(addUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })

    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      }).catch(res => {
        console.log(res);

      })

    // call it like this>
    /*   api.addCard("jerry", "https://pictures.s3.yandex.net/frontend-developer/functions/dog-3.jpg")
    .catch((res) => {
      console.log(res);
    }); */
  }

  likeButton(card, isLiked, token) {
    if (!isLiked) {
      console.log(card);
      return fetch(`https://register.nomoreparties.co/cards/${card}/likes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        }).catch(res => {
          console.log(res);

        })
    } else {
      console.log(card);
      return fetch(`https://register.nomoreparties.co/cards/${card}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();

          }
        }).catch(res => {
          console.log(res);
        })


    }
  }

  likeCard(cardID, token) {
    const likeUrl = this._startUrl.concat("/cards/likes/" + cardID);
    fetch(likeUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) { }
      }).catch(res => {
        console.log(res);

      }).catch(res => {
        console.log(res);
      })
    //call it like> api.likeCard(cardID);
  }

  disLike(cardID, token) {
    const disLikeUrl = this._startUrl.concat("/cards/likes/" + cardID);
    fetch(disLikeUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        if (res.ok) {

        }
      }).catch(res => {
        console.log(res);

      })
    //call it like> api.disLike(cardID);
  }



  getInitialCards(token) {
    return fetch("https://register.nomoreparties.co/cards", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      }).catch(res => {
        console.log(res);
      })


  }
}


const api = new Api('https://register.nomoreparties.co');

export default api;
