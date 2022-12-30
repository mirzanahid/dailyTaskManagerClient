import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged,
    signOut,
} from "firebase/auth";


export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);


    //  login with email and password
    const createUser = (email, password) => {
        setLoad(true)
        return createUserWithEmailAndPassword(auth, email, password);

    }

    // login with email and password
    const login = (email, password) => {
        setLoad(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // logout
    const logout = () => {
        setLoad(true)
        localStorage.removeItem('accessToken')
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoad(false)
        })
        return () => unSubscribe();
    }, []);


    const authInfo = { createUser, user, login, logout, load, show, setShow }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;