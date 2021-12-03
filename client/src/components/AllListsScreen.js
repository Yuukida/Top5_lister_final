import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Typography } from '@mui/material'
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import NavBar from './NavBar';
import AuthContext from '../auth';

function AllListsScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() =>  {
        async function login() {
            const log = await auth.getLoggedIn();
            if(log || auth.isGuest){
                store.loadDefaultAllLists();
            }else{
                store.welcomePage();
            }
        }
        login()
    }, []);

    let listCard = "";
    if (store) {
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
                <Typography variant="h4">{store.searched ? store.searched + " Lists" : "All Lists"}</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default AllListsScreen;