import { useState } from "react";
import {useRouter} from "next/router";

export const useEditProfil = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const router = useRouter()


    const editProfil = async (prenom, nom, image, id) => {
        setIsLoading(true)
        setError(null)

            const formData = new FormData();
            formData.append("image", image);



        try {
            if(image){
                console.log('ici')

                const response = await fetch("/api/user/upload", {
                    method: "POST",
                    body: formData,
                });
                const json = await response.json();
                console.log('ici')

                if (!response.ok) {
                    setIsLoading(false);

                    setError(json.error);
                }else {

                    // Image upload successful, get the image URL

                    const image = json.imageUrl;
                    console.log(image)

                    const response2 = await fetch(`/api/user/${id}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ prenom, nom, image})
                    })

                    const json2 = await response2.json()

                    if (!response2.ok) {
                        setIsLoading(false)
                        setError(json2.error)
                    }
                    if (response2.ok) {

                        setIsLoading(false)

                        await router.push('/espacePerso') // Rediriger vers la page '/'
                    }
                }
            } else {


                const response2 = await fetch(`/api/user/${id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ prenom, nom})
                })
                const json2 = await response2.json()
                if (!response2.ok) {
                    setIsLoading(false)
                    setError(json2.error)
                }
                if (response2.ok) {

                    setIsLoading(false)

                    await router.push('/espacePerso') // Rediriger vers la page '/'
                }
            }

        } catch (error) {
            setIsLoading(false);
            setError("Une erreur s'est produite lors de la modification.");
        }
    }
    return { editProfil, isLoading, error }
}
