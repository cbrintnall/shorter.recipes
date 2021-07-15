import React from 'react';
import firebase from 'firebase';

export const UserContext = React.createContext<firebase.User | null>(null);