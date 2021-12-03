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
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SortIcon from '@mui/icons-material/Sort';

export default function NavBar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext)
    const [search, setSearch] = useState("")
    const handleGroup = () => {
        store.goToAllLists()
    }

    const handleHome = () => {
        store.goToHome()
    }

    const handleCommunity = () => {
        store.goToCommunity()
    }

    const handleUser = () => {
        store.goToUser()
    }

    const handleSortNewest = () => {
        store.sortNewest()
        sortMenuClose();
    }

    const handleSortOldest = () => {
        store.sortOldest();
        sortMenuClose();
    }

    const handleSortViews = () => {
        store.sortViews()
        sortMenuClose();
    }

    const handleSortLikes = () => {
        store.sortLikes()
        sortMenuClose();
    }

    const handleSortDislikes = () => {
        store.sortDislikes()
        sortMenuClose();
    }

    const handleShowSortMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const sortMenuClose = () => {
        setAnchorEl(null);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSearchKeyPress = (event) => {
        if(event.code === "Enter"){
            if(store.pageType === "COMMUNITY"){
                store.searchLists(search)
                event.target.value = "";
                setSearch("")
            }else if (store.pageType === "USERS"){
                store.searchUsers(search)
                event.target.value = "";
                setSearch("")
            }else if (store.pageType === "ALLLISTS"){
                store.searchStartWith(search)
                event.target.value = "";
                setSearch("")
            }else{
                store.searchStartWithHome(search)
                event.target.value = "";
                setSearch("")
            }
        }
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
            <MenuItem onClick={handleSortNewest}>Publish Date (Newest)</MenuItem>
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
                disabled={navbarDisable || auth.isGuest}
                onClick={handleHome}
                >
                    <HomeOutlinedIcon fontSize="large" ></HomeOutlinedIcon>
                </IconButton>

                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                disabled={navbarDisable}
                onClick={handleGroup}>
                    <GroupsOutlinedIcon fontSize="large"  ></GroupsOutlinedIcon>
                </IconButton>

                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                disabled={navbarDisable}
                onClick={handleUser}>
                    <PersonOutlineOutlinedIcon fontSize="large" ></PersonOutlineOutlinedIcon>
                </IconButton>

                <IconButton
                size="large"
                color="inherit"
                style={{ backgroundColor: 'transparent' }}
                disabled={navbarDisable}
                onClick={handleCommunity}>
                    <FunctionsOutlinedIcon fontSize="large" ></FunctionsOutlinedIcon>
                </IconButton>

                <InputBase
                sx={{backgroundColor: "white", height:40, width:"40%"}}
                placeholder="Search"
                disabled={navbarDisable}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
                />
                <Box sx={{flex:1}}></Box>
                
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
