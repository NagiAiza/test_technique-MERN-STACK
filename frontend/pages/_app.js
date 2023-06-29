import React from 'react';
import '../styles/globals.css'; // Import du fichier CSS global
import App from 'next/app';

import { AuthContextProvider } from './context/AuthContext';
import { UsersContextProvider } from './context/UsersContext';



class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <AuthContextProvider>
                <UsersContextProvider>
                    <Component {...pageProps} />
                </UsersContextProvider>
            </AuthContextProvider>
        );
    }
}

export default MyApp;
