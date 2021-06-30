import React, { useState } from "react";
import * as firebase from "firebase";
import { AiFillFacebook, AiFillGoogleCircle, AiFillGoogleSquare, AiFillTwitterSquare, AiOutlineFacebook, AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { IconType } from "react-icons/lib";

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

type SignInButtonProps = {
  icon: IconType,
  hoverIcon: IconType,
  provider: firebase.auth.AuthProvider
}

const SignInIconButton = (props: SignInButtonProps) => {
  const [ hovered, setHovered ] = useState(false);

  const Icon = hovered 
    ? props.hoverIcon
    : props.icon;

  return (
    <div 
      className="signin-button"
      style={{display: 'inline', padding: '4px'}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => firebase.auth().signInWithRedirect(props.provider)}
    >
      <Icon size={30} />
    </div>
  )
}

export const SignInButtons = () => {
  return (
    <div>
      <span>Sign in | </span>
      {/* <SignInIconButton 
        icon={AiOutlineFacebook} 
        hoverIcon={AiFillFacebook}
        provider={facebookProvider} 
      />
      <span> / </span> */}
      {/* <SignInIconButton 
        icon={AiOutlineGoogle}
        hoverIcon={AiFillGoogleSquare}
        provider={googleProvider} 
      />
      <span> / </span> */}
      <SignInIconButton 
        icon={AiOutlineTwitter}
        hoverIcon={AiFillTwitterSquare}
        provider={twitterProvider} 
      />
      {/* <span> / </span> */}
      <span style={{float:'right'}}> (More sign-in methods coming soon) </span>
    </div>
  );
};
