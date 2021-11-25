import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';



export default function NavBar() {

    return(
        <Box sx={{ flexGrow: 1 }}> 
            <Toolbar>
                <HomeOutlinedIcon></HomeOutlinedIcon>
            </Toolbar>
        </Box>
    )
}