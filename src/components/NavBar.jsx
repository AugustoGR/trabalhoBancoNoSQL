import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Box from '@mui/material/Box'
import { useUserContext } from "@/contexts";
import { useRouter } from 'next/router'
export default function NavBar() {
    const { user } = useUserContext();
    const router = useRouter();
    if(!user) {
      return <></>
    }
     
    function goToClients() {
      router.push('/')
    }

    return (
      <Box 
        component="nav"
        sx={{ width: 240, flexShrink: { sm: 0 }, display: 'flex', height: '100%', flexDirection: 'row' }}
      >
        <Drawer
          variant="permanent"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': {width: 240, boxSizing: 'border-box', backgroundColor:'#2ba0e3'}}}
        >
            <img className="w-36 mx-auto" src="/images/logo-sales-data.png" alt="Logo Sales Data" />
            <List>
              <ListItem key={'Clientes'} disablePadding>
                <ListItemButton onClick={goToClients}>
                  <ListItemIcon sx={{minWidth: 40, color: 'white'}}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color: 'white'}} primary={'Clientes'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={'Clientes'} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{minWidth: 40, color: 'white'}}>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color: 'white'}} primary={'Produtos'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={'Clientes'} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{minWidth: 40, color: 'white'}}>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color: 'white'}} primary={'Vendas'} />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
      </Box>
    )
}