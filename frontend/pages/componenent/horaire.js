import React, { useState } from 'react';

const Reservation = () => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const handleTimeSlotClick = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const timeSlots = [
        '12:00 AM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
    ];

    return (
        <div style={{
            color:'white',
            width:'90%',
            padding:'0'
        }}>
            <h2>Choisissez une plage horaire :</h2>
            <div>
                {timeSlots.map((timeSlot) => (
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



                style={{
                backgroundColor : 'transparent',
                color: 'white',
                border: '1px solid #d4a713',
                padding: '10px',
                margin: '5px',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
                >
            Reserver
                </button>
                </div>

            )}
        </div>
    );
};

export default Reservation
