import Document, {Head, Html, Main, NextScript} from 'next/document';
export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Whisper&display=swap" rel="stylesheet"/>

                </Head>
                <body style={{backgroundColor:"#121219"}}>

                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}
