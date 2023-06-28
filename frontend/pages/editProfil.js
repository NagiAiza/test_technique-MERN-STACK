import { useState } from "react"
import { useEditProfil } from "./hooks/useEditProfil"
import Navbar from "@/pages/componenent/Navbar";
import {useRouter} from "next/router";


const EditProfile = () => {
    const router = useRouter();
    const { id, fname, name } = router.query;
    const [prenom, setPrenom] = useState()
    const [pMod, setPMod] = useState(false)
    const [nom, setNom] = useState()
    const [nMod, setNMod] = useState(false)
    const [image, setImage] = useState(null);
    const {editProfil , error, isLoading} = useEditProfil()


    const handleSubmit = async (e) => {
        e.preventDefault() //evite de recharger la page apres avoir appuyer sur le bouton
        await editProfil(prenom, nom, image, id)
    }

    return (
        <>
            <Navbar/>
            <div style={{justifyContent:"center", alignItems:"center"}}>
                <form style={{backgroundColor:"#FFFFFFA4", borderRadius:"20px", width:"auto", padding:"5%", display:"inline-grid",margin:"auto", justifyContent:"center", alignItems:"center"}} className="signup" onSubmit={handleSubmit}>

                    <h3>Modification des informations</h3>

                    <label>Prenom:</label>
                    <input
                        type="prenom"
                        onChange={(e) => {setPrenom(e.target.value); setPMod(true);}}
                        value={prenom ? prenom : (fname && !pMod ? fname : '')}
                    />
                    <label>Nom:</label>
                    <input
                        type="nom"
                        onChange={(e) => {setNom(e.target.value); setNMod(true);}}
                        value={nom ? nom : (name && !nMod ? name : '')}
                    />

                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button  disabled={isLoading}>Modifier</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </>
    )
}

export default EditProfile
