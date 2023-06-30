import {useEffect, useState} from "react"
import { useEditReservation } from "./hooks/UseEditReservation";


import {useRouter} from "next/router";
import Head from "next/head";
import Navbar from "@/pages/componenent/Navbar";

const EditReservation = () => {
    const router = useRouter();

    const { id, nombre } = router.query;

    const [formulaires, setFormulaires] = useState([]);
    const [plats, setPlats] = useState([]);
    const [vins, setVins] = useState([]);
    const [nbVins, setNbVins] = useState([]);

    const {editReservation , error, isLoading} = useEditReservation()

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
                console.error('Erreur lors de la récupération des plats :', error);
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
        e.preventDefault() //evite de recharger la page apres avoir appuyer sur le bouton

        // Calculate total price
        let totalPrice = 0;
        formulaires.forEach((formulaire) => {
            const { entree, plat, dessert } = formulaire.selection;

            const selectedEntree = plats.find((p) => p._id === entree);
            if (selectedEntree) {
                totalPrice += selectedEntree.price;
            }

            const selectedPlat = plats.find((p) => p._id === plat);
            if (selectedPlat) {
                totalPrice += selectedPlat.price;
            }

            const selectedDessert = plats.find((p) => p._id === dessert);
            if (selectedDessert) {
                totalPrice += selectedDessert.price;
            }
        });

        let totalBottlePrice = 0; // Initialisation du prix total des bouteilles à 0

        plats
            .filter((plat) => plat.ordre === 4)
            .forEach((vin, index) => {
                const quantity = nbVins[index] || 0; // Récupération de la quantité de la bouteille
                totalBottlePrice += vin.price * quantity; // Ajout du prix total de chaque bouteille (prix * quantité)
            });

        totalPrice += totalBottlePrice;//il faudrait afficher le prix a cote du bouton soummetre

        const bottlesData = plats
            .filter((plat) => plat.ordre === 4)
            .map((vin, index) => ({
                vin: vin._id,
                quantity: nbVins[index] || 0,
            }));

        const formData = {
            menus: formulaires.map((formulaire) => formulaire.selection), // Extrait la sélection de chaque formulaire
            bottles: bottlesData,
            totalPrice: totalPrice,
        };

        await editReservation(id, formData)
    }

    const FormulaireVins = () => {
        return (
            <div style={styles.formulaire}>
                <h1>Vins</h1>
                {plats
                    .filter((plat) => plat.ordre === 4)
                    .map((vin, index) => (
                        <div key={vin._id} style={{ margin: '30px' }}>
                            <form id={vin._id} key={vin._id} style={{ display: 'inline-grid' }}>
                                <h3>{vin.title}</h3>

                                <label htmlFor={`nbVins-${index}`}>Nombre de vins :</label>
                                <input
                                    id={`nbVins-${index}`}
                                    onChange={(e) => handleChange(e, index + 1, 'nbVins')}
                                    min={0}
                                    max={5}
                                    type="number"
                                    style={{ marginBottom: '10px' }}
                                    value={nbVins[index] || ''}
                                />
                            </form>
                        </div>
                    ))}
            </div>
        );
    };

    const genererFormulaires = () =>
        formulaires.map((formulaire) => (
            <div key={formulaire.id} style={styles.formulaire}>
                <h3>{formulaire.id}</h3>
                <form style={{ display: 'inline-grid' }}>
                    <label htmlFor={`entree-${formulaire.id}`}>Entrée :</label>
                    <select
                        id={`entree-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id, 'entree')}
                        style={styles.select}
                        value={formulaire.selection.entree}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats
                            .filter((plat) => plat.ordre === 1)
                            .map((plat) => (
                                <option key={plat._id} value={plat._id}>
                                    {plat.title}
                                </option>
                            ))}
                    </select>

                    <label htmlFor={`plat-${formulaire.id}`}>Plat :</label>
                    <select
                        id={`plat-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id, 'plat')}
                        style={styles.select}
                        value={formulaire.selection.plat}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats
                            .filter((plat) => plat.ordre === 2)
                            .map((plat) => (
                                <option key={plat._id} value={plat._id}>
                                    {plat.title}
                                </option>
                            ))}
                    </select>

                    <label htmlFor={`dessert-${formulaire.id}`}>Dessert :</label>
                    <select
                        id={`dessert-${formulaire.id}`}
                        onChange={(e) => handleChange(e, formulaire.id, 'dessert')}
                        style={styles.select}
                        value={formulaire.selection.dessert}
                    >
                        <option value="">Sélectionnez un plat</option>
                        {plats
                            .filter((plat) => plat.ordre === 3)
                            .map((plat) => (
                                <option key={plat._id} value={plat._id}>
                                    {plat.title}
                                </option>
                            ))}
                    </select>
                </form>
            </div>
        ));

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div>
                    <Navbar />
                    <div style={styles.container}>
                        <div style={styles.formulaires}>
                            {genererFormulaires()}
                            <FormulaireVins key="vins" />
                        </div>
                        <button type="submit" onClick={handleSubmit} style={styles.button}>
                            Soumettre
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

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

export default EditReservation;
