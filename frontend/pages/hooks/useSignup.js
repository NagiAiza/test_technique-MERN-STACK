import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import {useRouter} from "next/router";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const router = useRouter()

    const signup = async (email, password, role, prenom, nom, image) => {
        setIsLoading(true)
        setError(null)

        const formData = new FormData();
        formData.append("image", image);

        try {

            const response = await fetch("/api/user/upload", {
                method: "POST",
                body: formData,
            });
            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);

                setError(json.error);
            }else {

                // Image upload successful, get the image URL

                const image = json.imageUrl;
                console.log(image)

                const response2 = await fetch('/api/user/signup', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password, role, prenom, nom, image})
                })

                const json2 = await response2.json()

                if (!response2.ok) {
                    setIsLoading(false)
                    setError(json2.error)
                }
                if (response2.ok) {
                    // save the user to local storage
                    localStorage.setItem('user', JSON.stringify(json2))

                    // update the auth context
                    dispatch({type: 'LOGIN', payload: json2})

                    setIsLoading(false)

                    await router.push('/') // Rediriger vers la page '/'
                }
            }
        } catch (error) {
            setIsLoading(false);
            setError("Une erreur s'est produite lors de l'inscription.");
        }
    }
    return { signup, isLoading, error }
}
