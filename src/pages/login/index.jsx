import * as React from 'react';

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

import { useUserContext } from "@/context";
import { useLogin } from "@/hooks";

export default function Login() {
    const { login, error } = useUserContext();
    const { user, setUser, password, setPassword } = useLogin();
    return (
        <div className="flex justify-center align-middle flex-col h-screen">
            <img className="w-36 mx-auto" src="/images/logo-sales-data.png" alt="Logo Sales Data" />
            <h1 className='w-auto text-center mb-10 text-5xl font-medium'>Bem vindo</h1>
            <form className="flex justify-center flex-col mx-auto gap-4 w-80">
                <TextField error={error} onChange={(e)=>{setUser(e.target.value)}} id="user" label="Usuário" variant="outlined" />
                <TextField error={error} onChange={(e)=>{setPassword(e.target.value)}} className="mb-5" type="password" id="password" label="Senha" variant="outlined" />
                <Button onClick={ () => {login(user, password)} } color="primary" variant="outlined">Login</Button>
            </form>
        </div>
    );
}