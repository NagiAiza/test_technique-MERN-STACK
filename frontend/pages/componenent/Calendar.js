import {useState} from 'react';
import Calendar from 'react-calendar';
import moment from 'moment'

function Calendrier() {

    const [date, setDate] = useState(new Date());


    return (
        <div style={{margin:"3%", padding:"3%", width:"40%"}}>
            <h1 style={{color:"White", textAlign:"center", fontSize:"20px"}}>Selectionner une Date</h1>
            <p style={{color:"White", textAlign:"center", fontSize:"20px"}}><b>{moment(date).format('MMMM YYYY')}</b></p>
            <div style={{color:"White", backgroundColor:"#FFFFFF4F",margin:"3%", padding:"3%", borderRadius:"10px" }}>
                <Calendar
                    value={date}
                    onChange={setDate}
                    locale="fr"
                    view="day"
                    headerTemplate={() => <p>gf</p>}
                />
            </div>
        </div>
    )

}

export default Calendrier;
