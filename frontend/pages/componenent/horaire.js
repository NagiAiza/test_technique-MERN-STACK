import React, { useState } from 'react';
import { Link } from 'next/link';
import { useRouter } from 'next/router';



const Reservation = () => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [nombre, setNombre] = useState(0);
    const router = useRouter();

    const handleTimeSlotClick = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };
    const handleNombreChange = (e) => {
        const value = parseInt(e.target.value);
        setNombre(value);
    };

    const timeSlots = ['Midi', 'Soir'];
    const handleReserverClick = () => {
        router.push({
            pathname: '/Choix',
            query: { nombre: nombre, creneau: selectedTimeSlot },
        });
    };
    return (
        <div style={{ color: 'white', width: '90%', padding: '0' }}>
            <h2>Combien êtes-vous ?</h2>

                <input
                    min={0}
                    max={5}
                    type="number"
                    value={nombre}
                    onChange={handleNombreChange}
                    style={{ marginBottom: '10px' }}
                />



            <div>
                {nombre !== 0 && <h2>Choisissez une plage horaire :</h2>}
                { nombre !== 0 && timeSlots.map((timeSlot) => (
                    <button
                        key={timeSlot}
                        onClick={() => handleTimeSlotClick(timeSlot)}
                        style={{
                            backgroundColor: selectedTimeSlot === timeSlot ? '#d4a713' : 'transparent',
                            color: 'white',
                            border: '1px solid #d4a713',
                            padding: '10px',
                            margin: '5px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {timeSlot}
                    </button>
                ))}
            </div>
            {selectedTimeSlot && (
                <div>
                    <p>Votre réservation est confirmée pour la plage horaire : {selectedTimeSlot}</p>
                    <button
                        onClick={handleReserverClick}
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '1px solid #d4a713',
                            padding: '10px',
                            margin: '5px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                        }}
                    >Reserver
                    </button>
                </div>
            )}
        </div>
    );
};

export default Reservation;
