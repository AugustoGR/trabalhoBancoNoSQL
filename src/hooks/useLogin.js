import { useState } from "react";
const useLogin = () => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    return { user, setUser, password, setPassword };
}

export {useLogin}