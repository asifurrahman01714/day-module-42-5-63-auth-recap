import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const ghProvider = new firebase.auth.GithubAuthProvider();
  const [user, setUser] = useState({});


  const handleSignIn =()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log(user, token);
      setUser(user);
    }).catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
  }

  const handleFbSignIn =()=>{
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fbUser', user);
        setUser(user);
      })

      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  const handleGitHubSignIn =()=>{
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fbUser', user);
        setUser(user);
      })

      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  return (
    <div className="App">
      <button onClick ={handleSignIn}>Sign In With Google</button>
      <br/>
      <button onClick ={handleFbSignIn}>Sign In With Facebook</button>
      <br/>
      <button onClick ={handleGitHubSignIn}>Sign In With Git Hub</button>
      <h3>User Name: {user.displayName}</h3>
      <h3>User email: {user.email}</h3>
      <img src={user.photoURL} alt=""/>
      
    </div>
  );
}

export default App;
