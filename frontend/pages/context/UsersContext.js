import { createContext, useReducer } from 'react'

export const UsersContext = createContext()

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                comptes: action.payload
            }
        case 'DELETE_USER':
            return {
                comptes: state.comptes.filter(w => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, {
        comptes: null
    })

    return (
        <UsersContext.Provider value={{ ...state, dispatch }}>
            { children }
        </UsersContext.Provider>
    )
}