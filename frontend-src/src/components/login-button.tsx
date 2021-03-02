import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import * as firebase from "firebase";

const authProvider = new firebase.auth.FacebookAuthProvider();

export const SignInButtons = () => {
  const [ signedIn, setSignedIn ] = useState(false);

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div>
      <Button className="login-button" onClick={() => 
        firebase.auth().signInWithRedirect(authProvider)
      }>
        Sign In
      </Button>
    </div>
  );
};
