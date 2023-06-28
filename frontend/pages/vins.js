import { usePlat } from "./hooks/useplat";

export default function Home() {
    const { createPlat, isLoading, error } = usePlat();

    const handleCreatePlat = () => {
        const data = {
            title: "pomme de terre",
            description: "pomme de terre",
            ordre: 2,
        };
        createPlat(data);
    };

    return (
        <div>
            {/* Rendu du contenu de votre composant ici */}
            <button onClick={handleCreatePlat} disabled={isLoading}>
                {isLoading ? 'En cours de création...' : 'Créer un plat'}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};
