import {useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserContext } from '@/contexts';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header() {
    const { user, logout } = useUserContext();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }
    const handleLogout = () => {
        setOpen(false);
        logout();
    }
    
    if(!user) {
        return <></>
    }

    return (
        <div className="flex justify-end p-3 items-center">
            <span className="mr-2 text-lg font-medium">Olá, {user?.user} </span>
            <Button
                onClick={handleClick}
            >
                <AccountCircleIcon className='w-10 h-10' />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}