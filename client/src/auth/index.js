import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    UPDATE_USER_LISTS: "UPDATE_USER_LISTS",
    ACCOUNT_ERROR: "ACCOUNT_ERROR",
    SET_GUEST: "SET_GUEST"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMsg: null,
        isGuest: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMsg: null,
                    isGuest: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMsg: null,
                    isGuest: false
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMsg: null,
                    isGuest: false
                });
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: null,
                    isGuest: false
                })
            }
            case AuthActionType.UPDATE_USER_LISTS: {
                return setAuth({
                    user: auth.user,
                    loggedIn: true,
                    errorMsg: payload,
                    isGuest: false
                })
            }
            case AuthActionType.ACCOUNT_ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMsg: payload,
                    isGuest: auth.isGuest
                })
            }
            case AuthActionType.SET_GUEST: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: null,
                    isGuest: true
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user,
                    }
                });
                return true;
            }
        }catch(err){
            return false;
        }
    }

    auth.loginIn = async function (userData, store) {
        try{
            const response = await api.loginUser(userData);
            if (response.status === 200){
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                    }
                });
                history.push("/home/");
                store.loadIdNamePairs();
            }
        }catch (err){
            authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: err.response.data.errorMessage
            })
        }
    }

    auth.closeModal = function (){
        authReducer({
            type: AuthActionType.ACCOUNT_ERROR,
            payload: null
        });
    }

    auth.logoutUser = async function() {
        await api.logoutUser();
        authReducer({
            type: AuthActionType.LOGOUT_USER,
            payload: {

            }
        })
        history.push("/");
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }catch (err){
            authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: err.response.data.errorMessage
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };