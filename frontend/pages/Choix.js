import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Choix = () => {
    const router = useRouter();
    const { nombre } = router.query;

    const [formulaires, setFormulaires] = useState([]);
    const [plats, setPlats] = useState([]);

    useEffect(() => {
        if (nombre) {
            const count = parseInt(nombre);
            const nouveauxFormulaires = Array(count)
                .fill()
                .map((_, index) => ({ id: index + 1, selection: '' }));
            setFormulaires(nouveauxFormulaires);
        }

        // Effectuez votre requête à la base de données pour récupérer les plats d'ordre 1
        // et mettez à jour l'état "plats" avec les résultats de la requête
        const fetchPlats = async () => {
            try {
                // Effectuez votre requête à la base de données ici
                const response = await fetch('/api/plat/meals');
                const data = await response.json();

                // Mettez à jour l'état "plats" avec les données récupérées
                setPlats(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des plats:', error);
            }
        };

        fetchPlats();
    }, [nombre]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        setFormulaires((prevFormulaires) =>
            prevFormulaires.map((formulaire) =>
                formulaire.id === index + 1 ? { ...formulaire, selection: value } : formulaire
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        formulaires.forEach((formulaire) => {
            console.log(`Formulaire ${formulaire.id}:`, formulaire);
        });

        router.push('/');
    };

    const genererFormulaires = () =>
        formulaires.map((formulaire) => (
            <div key={formulaire.id} style={styles.formulaire}>
                <h3>{formulaire.id}</h3>
                <form style={{display: "inline-grid"}} >
                    <label htmlFor={`entree-${formulaire.id}`}> entrée : </label>
                    <select
                        id={`entree-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id)}
                        style={styles.select}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plats) => plats.ordre === 1).map((plat) => (
                            <option key={plat.id} value={plat.id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>
                    <label htmlFor={`entree-${formulaire.id}`}> Plat : </label>
                    <select
                        id={`entree-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id)}
                        style={styles.select}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plats) => plats.ordre === 2).map((plat) => (
                            <option key={plat.id} value={plat.id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>
                    <label htmlFor={`entree-${formulaire.id}`}> Dessert : </label>
                    <select
                        id={`entree-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id)}
                        style={styles.select}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plats) => plats.ordre === 3).map((plat) => (
                            <option key={plat.id} value={plat.id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>
                    <label htmlFor={`entree-${formulaire.id}`}> Vins : </label>
                    <select
                        id={`entree-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id)}
                        style={styles.select}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plats) => plats.ordre === 4).map((plat) => (
                            <option key={plat.id} value={plat.id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
        ));

    return (
        <div style={styles.container}>
            <div style={styles.formulaires}>{genererFormulaires()}</div>
            <button type="submit" onClick={handleSubmit} style={styles.button}>
                Soumettre
            </button>
        </div>
    );
};


const styles = {
    container: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
    },
    button: {
        margin: '50px',
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid #d4a713',
        padding: '10px',

        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    formulaires: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formulaire: {
        backgroundColor: '#FFFFFF0F',
        margin: '30px',
        padding: '10px',
        borderRadius: '20px',
        textAlign: 'center',
    },
    select: {
        margin: '3%',
        padding: '1%',
        width: 'auto',
    },
};

export default Choix;
