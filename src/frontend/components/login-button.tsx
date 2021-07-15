import React, { useState } from "react";
import firebase from "firebase";
import { AiFillTwitterSquare, AiOutlineTwitter } from "react-icons/ai";
import { IconType } from "react-icons/lib";

const twitterProvider = new firebase.auth.TwitterAuthProvider();

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
      <SignInIconButton 
        icon={AiOutlineTwitter}
        hoverIcon={AiFillTwitterSquare}
        provider={twitterProvider} 
      />
    </div>
  );
};
