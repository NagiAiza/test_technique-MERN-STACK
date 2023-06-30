import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from "./hooks/useAuthContext";

const Choix = () => {
    const { user } = useAuthContext(); // Il me faut l'id
    const router = useRouter();
    const { date, creneau, nombre } = router.query;

    const [formulaires, setFormulaires] = useState([]);
    const [plats, setPlats] = useState([]);
    const [vins, setVins] = useState([]);
    const [nbVins, setNbVins] = useState([]);

    useEffect(() => {
        if (nombre) {
            const count = parseInt(nombre);
            const nouveauxFormulaires = Array(count)
                .fill()
                .map((_, index) => ({
                    id: index + 1,
                    selection: { entree: '', plat: '', dessert: '', vins: '', nbVins: 0 },
                }));
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
                formulaire.id === index
                    ? {
                        ...formulaire,
                        selection: {
                            ...formulaire.selection,
                            [field]: value,
                        },
                    }
                    : formulaire
            )
        );

        if (field === 'vins') {
            setVins((prevVins) => {
                const updatedVins = [...prevVins];
                updatedVins[index - 1] = value;
                return updatedVins;
            });
        }

        if (field === 'nbVins') {
            setNbVins((prevNbVins) => {
                const updatedNbVins = [...prevNbVins];
                updatedNbVins[index - 1] = parseInt(value); // Convertir en nombre entier
                return updatedNbVins;
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const bottlesData = formulaires.map((formulaire, index) => ({
            vin: formulaire.selection.vins,
            quantity: nbVins[index] || 0,
        }));

        const formData = {
            userId: user.id,
            date: date, // Replace selectedDate with the actual selected date
            timeSlot: creneau, // Replace selectedTimeSlot with the actual selected time slot
            numberOfPeople: nombre, // Replace nombre with the actual number of people
            menus: formulaires.map((formulaire) => formulaire.selection), // Extract the selection from each formulaire
            bottles: bottlesData,
            totalPrice: 50,
        };

        try {
            const response = await fetch('/api/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Reservation data sent to MongoDB successfully');
                // Handle success, such as displaying a success message or redirecting to a confirmation page
            } else {
                console.error('Failed to send reservation data to MongoDB');
                // Handle failure, such as displaying an error message or retrying the request
            }
        } catch (error) {
            console.error('Error while sending reservation data:', error);
            // Handle error, such as displaying an error message or retrying the request
        }

        router.push('/');
    };

    const FormulaireVins = ({ id }) => {
        return (
            <div style={styles.formulaire}>
                <h3>{id}</h3>
                <form style={{ display: 'inline-grid' }}>
                    <label htmlFor={`vins-${id}`}>Vins:</label>
                    <select
                        id={`vins-${id}`}
                        onChange={(e) => handleChange(e, id, 'vins')}
                        style={styles.select}
                    >
                        <option value="">Sélectionnez un vin</option>
                        {plats.filter((plat) => plat.ordre === 4).map((plat) => (
                            <option key={plat._id} value={plat._id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>

                    <label htmlFor={`nbVins-${id}`}>Nombre de vins:</label>
                    <input
                        id={`nbVins-${id}`}
                        onChange={(e) => handleChange(e, id, 'nbVins')}
                        min={0}
                        max={5}
                        type="number"
                        style={{ marginBottom: '10px' }}
                        value={nbVins[id - 1] || ''} // Passer la valeur de nbVins
                    />
                </form>
            </div>
        );
    };

    const genererFormulaires = () =>
        formulaires.map((formulaire) => (
            <div key={formulaire.id} style={styles.formulaire}>
                <h3>{formulaire.id}</h3>
                <form style={{ display: 'inline-grid' }}>
                    <label htmlFor={`entree-${formulaire.id}`}>Entrée:</label>
                    <select
                        id={`entree-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id, 'entree')}
                        style={styles.select}
                        value={formulaire.selection.entree}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats.filter((plat) => plat.ordre === 1).map((plat) => (
                            <option key={plat._id} value={plat._id}>
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
                            <option key={plat._id} value={plat._id}>
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
                            <option key={plat._id} value={plat._id}>
                                {plat.title}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
        ));

    return (
        <div style={styles.container}>
            <div style={styles.formulaires}>
                {genererFormulaires()}
                <FormulaireVins />
            </div>

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
