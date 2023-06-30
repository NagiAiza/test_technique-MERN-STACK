import { useState } from "react";
import {useRouter} from "next/router";

export const useEditReservation = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const router = useRouter()


    const editReservation = async (id, formData) => {
        setIsLoading(true)
        setError(null)


        try {

                const response = await fetch(`/api/reservation/${id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                })
                const json = await response.json()
                if (!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
                if (response.ok) {

                    setIsLoading(false)

                    await router.push('/espacePerso') // Rediriger vers la page '/'
                }

        } catch (error) {
            setIsLoading(false);
            setError("Une erreur s'est produite lors de la modification.");
        }
    }
    return { editReservation, isLoading, error }
}