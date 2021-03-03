import React from 'react';
import * as firebase from 'firebase';

export const UserContext = React.createContext<firebase.User | null>(null);