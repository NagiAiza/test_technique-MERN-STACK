import React from 'react';
import '../styles/globals.css'; // Import du fichier CSS global
import App from 'next/app';
import { AuthContextProvider } from './context/AuthContext';


class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <AuthContextProvider>
                <Component {...pageProps} />
                </AuthContextProvider>

        );
    }
}

export default MyApp;
