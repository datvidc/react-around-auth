class Auth{
  constructor(options) {
    this._RegisterUrl = options.url;
    this._headerinfo = options.header;


  }
  signUp(email, password) {
 
   return fetch(this._RegisterUrl, {
      method: "POST",
      headers: this._headerinfo,
      body: JSON.stringify({
        name: "Name",
        about: "About Me",
        avatar: "https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg",
        password: password,
        email: email
      })
    }) .then(res => {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
    }).catch(res => {
      console.log(res);
    })


  }

}




const auth = new Auth({
  url: 'https://register.nomoreparties.co/signup',
  header: {
    "Content-Type": "application/json"
  }

});

export default auth;