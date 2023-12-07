import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/contexts';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Home() {
  const { user } = useUserContext();
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [clientToDel, setClientToDel] = useState('');
  const [clientIdToDel, setClientIdToDel] = useState(null);
  
  useEffect(() => {
    if (router.pathname !== '/login' && !user) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    getClients();
  }, []);

  const handleOpen = (name, id) => {
    setClientIdToDel(id);
    setClientToDel(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createClient = () => {
    router.push('/client');
  }

  const handleEdit = (id) => {
    router.push({
      pathname: '/client', 
      query: {id}
  });
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/client?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        user: user._id
      }
    });
    const data = await response.json();
    console.log(data);
    getClients();
    handleClose();
  }

  async function getClients() {
    const response = await fetch('http://localhost:3000/api/client', {headers: {user: user?._id}});
    const data = await response.json();
    setClients(data.data);
    console.log(data.data);
  }

  return (
    <>
      <h1 className='text-4xl font-medium mb-5' style={{color: '#052136'}}>Clientes</h1>
      <Divider  className='mb-6'/>
      <div className='flex flex-row-reverse p-3'>
      <Button onClick={createClient} variant="contained" className='rounded-full p-0 w-auto min-w-0'style={{background: '#2ba0e3'}}>
        <AddIcon className='w-10 h-10'/>
      </Button>
      </div>
      <List>
        {clients.map((client) => (
          <ListItem key={client._id} className='rounded shadow-md p-0 mb-2' style={{background: 'white'}}>
            <ListItemButton>
              <ListItemIcon sx={{minWidth: 40}}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={client.name} />
              <IconButton className="me-1" edge="end" aria-label="edit" onClick={()=>{ handleEdit(client._id) }}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={()=>{handleOpen(client.name, client._id)}}>
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Deletar cliente {clientToDel}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja mesmo deletar esse registro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={()=>{ handleDelete(clientIdToDel) }} autoFocus>
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </List>
    </>
  )
}
