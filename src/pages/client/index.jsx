import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/contexts';
import Divider from '@mui/material/Divider'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default function Client(props) {
    const { user } = useUserContext();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    
    
    useEffect(() => {
      if (router.query.id) {
        console.log(router.query.id)
        fetch(`${process.env.NEXT_PUBLIC_BASE}/api/client?id=${router.query.id}`)
          .then((response) => response.json())
          .then(({ data }) => {
            console.log(data)
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
            setCpf(data.cpf);
          });
      }
      if (router.pathname !== '/login' && !user) {
        router.push('/login');
      }
    }, [user]);

    async function handleSave() {
      try {
        console.log('teste', user)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/client${router.query.id ? '?id='+router.query.id : ''}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            user: user?._id,
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            cpf,
          }),
        })
        router.push('/')
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <div>
            <h1 className='text-4xl font-medium mb-5' style={{color: '#052136'}}>Cliente</h1>
            <Divider  className='mb-6'/>
            <div>
                <h2 className='text-2xl font-medium mb-5' style={{color: '#052136'}}>Dados do cliente</h2>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <TextField onChange={ (e) => {setName(e.target.value) }} value={name} id="name" name="name" label="Nome" variant="outlined" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <TextField onChange={ (e) => {setEmail(e.target.value) }} value={email} id="email" name="email" label="Email" variant="outlined" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <TextField onChange={ (e) => {setPhone(e.target.value) }} value={phone} id="phone" name="phone" label="Telefone" variant="outlined" />
                    </div>
                    <div className='flex flex-col gap-2 mb-8'>
                        <TextField onChange={ (e) => {setCpf(e.target.value) }} value={cpf} id="cpf" name="cpf" label="CPF" variant="outlined" />
                    </div>
                    <div className='flex justify-center'>
                        <Button variant='outlined' onClick={handleSave}>Salvar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}