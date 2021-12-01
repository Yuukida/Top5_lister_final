import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SortIcon from '@mui/icons-material/Sort';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "white",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 1),
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '50ch',
      },
    },
  }));

export default function NavBar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext)

    const handleGroup = () => {
        
    }

    const handleHome = () => {

    }

    const handleCommunity = () => {

    }

    const handleAllLists = () => {
        
    }

    const handleSortNewst = () => {
        sortMenuClose();
    }

    const handleSortOldest = () => {
        sortMenuClose();
    }

    const handleSortViews = () => {
        sortMenuClose();
    }

    const handleSortLikes = () => {
        sortMenuClose();
    }

    const handleSortDislikes = () => {
        sortMenuClose();
    }

    const handleShowSortMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const sortMenuClose = () => {
        setAnchorEl(null);
    }

    const menuId = 'primary-search-account-menu';
    const sortMenu =
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={sortMenuClose}
        >
            <MenuItem onClick={handleSortNewst}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortOldest}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleSortViews}>Views</MenuItem>
            <MenuItem onClick={handleSortLikes}>Likes</MenuItem>
            <MenuItem onClick={handleSortDislikes}>Dislikes</MenuItem>
        </Menu>
    let navbarDisable = false;
    let opacity = 1;
    if(store.currentList){
        navbarDisable = true;
        opacity = "38%"
    }
    return(
        <Box sx={{ display: "flex", width: "100%" }} > 
            <Toolbar sx={{ display:"flex", width: "100%" }} >
                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                disabled={navbarDisable}
                >
                    <HomeOutlinedIcon fontSize="large" onClick={handleHome}></HomeOutlinedIcon>
                </IconButton>

                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                disabled={navbarDisable}>
                    <GroupsOutlinedIcon fontSize="large"  onClick={handleGroup}></GroupsOutlinedIcon>
                </IconButton>

                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                disabled={navbarDisable}>
                    <PersonOutlineOutlinedIcon fontSize="large" onClick={handleAllLists}></PersonOutlineOutlinedIcon>
                </IconButton>

                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                disabled={navbarDisable}>
                    <FunctionsOutlinedIcon fontSize="large" onClick={handleCommunity}></FunctionsOutlinedIcon>
                </IconButton>

                <InputBase
                sx={{backgroundColor: "white", height:40, width:"40%"}}
                placeholder="Search"
                disabled={navbarDisable}
                />
                <Box sx={{width:"32%"}}></Box>
                
                <Typography sx={{fontWeight: 'bold', fontSize:20, opacity: opacity}}>SORT BY</Typography>
                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                onClick={handleShowSortMenu}
                disabled={navbarDisable}
                >
                    <SortIcon fontSize="large" ></SortIcon>
                </IconButton>
                
            </Toolbar>
            {sortMenu}
        </Box>
    )
}
