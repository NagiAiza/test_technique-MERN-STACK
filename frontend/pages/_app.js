import React from 'react';
import '../styles/globals.css'; // Import du fichier CSS global
import App from 'next/app';


class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (

                <Component {...pageProps} />

        );
    }
}

export default MyApp;
