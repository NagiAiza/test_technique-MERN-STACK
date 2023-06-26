import React from 'react';
import { Segment } from 'semantic-ui-react';
import styles from './section.module.css'; // Import du fichier CSS spécifique

const Section = () => {
    return (
        <div className={styles.container}  style={{
            height: '30%',
            backgroundColor: '#FFFFFF2F',
            padding: '2%',
            margin: '5%',
            borderRadius: '37px',
            textAlign: 'center',
            marginBottom: '50px',
            boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.25)',
        }}>
            <Segment className={styles.segment}  style={{backgroundColor: '#FFFFFF00', border:'None'}}>
                <p style={{fontFamily: 'Whisper', fontSize: '30px', color: 'white', marginTop:"20px" }}>Une adresse d’exception</p>
                <p style={{ fontSize: '20px', color: 'white' }}>99 Av. des Champs-Élysées,<br />75008 Paris</p>
            </Segment>
            <Segment className={styles.segment} style={{backgroundColor: '#FFFFFF00', border:'None'}}>
                <p style={{ fontFamily: 'Whisper', fontSize: '30px', color: 'white' }}>Une signature culinaire iconique</p>
                <button
                    style={{
                        marginBottom: '10px',
                        fontSize: '30px',
                        color: 'white',
                        backgroundColor: 'transparent',
                        borderStyle: 'none',
                        padding: '15px',
                        borderTop: 'solid white',
                        borderBottom: 'solid white',
                    }}
                >
                <a href="../menu" style={{ color: 'white' }} >Voir le menu</a>
                </button>
            </Segment>
            <Segment className={styles.segment} style={{backgroundColor: '#FFFFFF00', borderStyle:'None'}}>
                <p style={{ fontFamily: 'Whisper', fontSize: '30px', color: 'white' }}>Horaires</p>
                <p style={{ fontSize: '20px', color: 'white' }}>12h00-00H00<br />Lundi-Dimanche</p>
            </Segment>
        </div>
    );
};

export default Section;

