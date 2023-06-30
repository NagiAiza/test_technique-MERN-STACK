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
                .map((_, index) => ({ id: index + 1, selection: { entree: '', plat: '', dessert: '' } }));
            setFormulaires(nouveauxFormulaires);
        }

        const fetchPlats = async () => {
            try {
                const response = await fetch('/api/plat/meals');
                const data = await response.json();

                setPlats(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des plats:', error);
            }
        };

        fetchPlats();
    }, [nombre]);

    const handleChange = (e, index, field) => {
        const value = e.target.value;

        setFormulaires((prevFormulaires) =>
            prevFormulaires.map((formulaire) =>
                formulaire.id === index ? { ...formulaire, selection: { ...formulaire.selection, [field]: value } } : formulaire
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
                <form style={{ display: "inline-grid" }}>
                    <label htmlFor={`entree-${formulaire.id}`}>Entrée:</label>
                    <select
                        id={`entree-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id, 'entree')}
                        style={styles.select}
                        value={formulaire.selection.entree}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plat) => plat.ordre === 1).map((plat) => (
                            <option key={plat.id} value={plat.id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>

                    <label htmlFor={`plat-${formulaire.id}`}>Plat:</label>
                    <select
                        id={`plat-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id, 'plat')}
                        style={styles.select}
                        value={formulaire.selection.plat}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plat) => plat.ordre === 2).map((plat) => (
                            <option key={plat.id} value={plat.id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>

                    <label htmlFor={`dessert-${formulaire.id}`}>Dessert:</label>
                    <select
                        id={`dessert-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id, 'dessert')}
                        style={styles.select}
                        value={formulaire.selection.dessert}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plat) => plat.ordre === 3).map((plat) => (
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
