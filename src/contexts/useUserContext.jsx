import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();
    
    const login = useCallback(async (user, password) => {

        fetch(`${process.env.NEXT_PUBLIC_BASE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, password }),
        }).then((response) => {
            if (response.ok) {
                setError(false);
                return response.json();
            }
            throw new Error("Login inválido.");
        }).then((userData) => {
            console.log(userData)
            if (!userData.data) {
                throw new Error("Senha ou usuário inválido.");
            }
            setUser(userData.data);
            router.push("/");
        }).catch((error) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setError(true);
        });
    }, []);
    
    const logout = useCallback(() => {
        setUser(null);
    }, []);
    
    return (
        <UserContext.Provider value={{ user, login, logout, error }}>
        {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);