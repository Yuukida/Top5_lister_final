import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import NavBar from './NavBar';
import { IconButton } from '@mui/material';
import AuthContext from '../auth';

function HomeScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() =>  {
        async function log() {
            if(!auth.loggedIn){
                const log = await auth.getLoggedIn();
                if(log){
                    await store.loadHomeLists();
                }else{
                    store.welcomePage();
                }
            }else{
                store.loadHomeLists();
            }
        }
        log()
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store && store.pageType === "HOME") {
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
            {
                store.currentLists.map((pair) => (
                    <ListCard
                        key={pair._id}
                        attributes={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <NavBar />
            <div id="list-selector-heading">
            <IconButton 
                size="large"
                color="inherit"
                onClick={handleCreateNewList}
                style={{ backgroundColor: 'transparent' }}
            >
                <AddIcon fontSize="large" />
            </ IconButton>
                <Typography variant="h4">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default HomeScreen;