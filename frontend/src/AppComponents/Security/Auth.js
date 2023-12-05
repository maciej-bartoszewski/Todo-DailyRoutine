import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState('')

    function login() {
        setAuthenticated(true)
    }

    function logout() {
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, setUsername}  }>
            {children}
        </AuthContext.Provider>
    )
}