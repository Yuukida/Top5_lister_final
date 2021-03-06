import { useContext, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import NavBar from './NavBar';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import AuthContext from '../auth';

function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [items, setItems] = useState(store?.currentList?.items);
    const [name, setName] = useState(store?.currentList?.name)
    useEffect(() => {
        async function log() {
            const log = await auth.getLoggedIn()
            if(log){
                await store.goToHome()
            }else{
                store.welcomePage()
            }
        }
        if(!auth.loggedIn && !auth.isGuest){
            log()
        }
        if(store.currentList){
            let emptyItem = items.filter(item => item === "")
            if((new Set(items)).size !== items.length){
                setSave(true)
                setPublish(true)
            }else if(name === "" || emptyItem.length > 0){
                setSave(true)
                setPublish(true)
            }
            else{
                setSave(false)
                let sameLists = store.currentLists.filter((list) => {
                    return (list.name.toLowerCase() === name.toLowerCase()) && list.published
                }
                );
                if(sameLists.length === 0){
                    setPublish(false);
                }
                else if(sameLists[0]._id === store.currentList._id){
                    setPublish(false);
                }else{
                    setPublish(true);
                }
            }
        }
    }, [name]);

    const [publish, setPublish] = useState(!store?.currentList?.published);
    const [save, setSave] = useState(true)

    const handleSaveList = (event, id) => {
        store.saveList(id, name, items);
    }

    const handlePublishList = (event, id) => {
        store.publishList(id, name, items);
    }

    const handleItemChange = (event, index) => {
        items[index] = event.target.value
        setItems(items)
        let emptyItem = items.filter(item => item === "")
        if((new Set(items)).size !== items.length){
            setSave(true)
            setPublish(true)
        }else if(name === "" || emptyItem.length > 0){
            setSave(true)
            setPublish(true)
        }
        else{
            setSave(false)
            let sameLists = store.currentLists.filter((list) => {
                return (list.name.toLowerCase() === name.toLowerCase()) && list.published
            }
            );
            if(sameLists.length === 0){
                setPublish(false);
            }
            else if(sameLists[0]._id === store.currentList._id){
                setPublish(false);
            }else{
                setPublish(true);
            }
        }        
    }

    const handleListNameChange = (event) => {
        if(event){
            setName(event.target.value)
        }
    }

    let editItems = "";

    if (store.currentList) {
        editItems = 
            <Box
            key={"items"}
            sx={{backgroundColor: "#2c2f70", width: "97%",  borderRadius: 2, height: "79%", display: "flex", flexDirection:"column"}}
            >
                {
                    
                    store.currentList.items.map((item, index) => (
                        <Box sx={{width: "100%", display: "flex", flex:1}} key={"item" + index}>
                        <InputBase
                            value={index+1 + ". "}
                            sx={{m:1, backgroundColor: "#d5b240", border:1, borderRadius:2, width: 80,  fontSize: 35, }}
                            
                            inputProps={{
                                style: {
                                    fontWeight: "bold",
                                    textAlign: 'center',
                                }
                            }}
                            readOnly
                        />
                        <InputBase
                        sx={{m:1, backgroundColor: "#d5b240", border:1, borderRadius:2, width: '90%', flex:1}}
                        defaultValue={item}
                        inputProps={{ style: { fontSize: 35, marginLeft: 10} }}
                        id={"item" + index}
                        name={"item" + index}
                        onChange={(event) => handleItemChange(event, index)}
                        />
                        </Box>
                    ))
                    
                }
                </Box>;
    }

    return (
        <div id="top5-workspace">
            <NavBar />
            <div id="list-selector-heading">
            <IconButton 
                size="large"
                color="inherit"
                disabled={true}
                style={{ backgroundColor: 'transparent' }}
            >
                <AddIcon fontSize="large" />
            </ IconButton>
                <Typography variant="h3" sx={{opacity:0.38}}>Your Lists</Typography>
            </div>
            
            <Grid container 
            sx={{
                width: '100%', 
                alignItems:"center",
                justifyContent: "center",
                height: "90%",
            }}
            >
                <Grid container
                sx={{
                    width: "95%",
                    height: "100%",
                    backgroundColor: "#d4d4f5",
                    borderRadius: 2,
                    border: 1,
                    justifyContent: "center",
                }}
                >
                    
                    <Grid 
                        sx={{
                            width: "98%"
                        }}
                    >
                    <InputBase
                        defaultValue={store?.currentList?.name}
                        sx={{ m:1, backgroundColor: "white", width: "50%", fontWeight: "bold", fontSize:18}}
                        onChange={handleListNameChange}
                        id="name"
                        name="name"
                    />
                    </Grid>
                    {editItems}
                        
                    
                    <div style={{
                        display: "flex",
                        width: "97%",
                        justifyContent: "flex-end",
                        
                    }}
                    >
                    <Button
                    sx={{
                        backgroundColor: "#dddddd", 
                        color: "black", 
                        fontWeight: "bold", 
                        fontSize: 20, 
                        border:1, 
                        borderRadius:2, 
                        height:45,
                        width: "10%",
                     }}
                     disabled={save}
                     onClick={(event) => handleSaveList(event, store.currentList._id)}
                    >
                        {"SAVE"}
                    </Button>
                    <Box sx={{width: 10}}></Box>
                    <Button
                    sx={{
                        backgroundColor: "#dddddd", 
                        color: "black", 
                        fontWeight: "bold", 
                        fontSize: 20, 
                        border:1, 
                        borderRadius:2, 
                        height:45,
                        width: "10%",
                     }}
                     
                    disabled={publish}
                    onClick={(event) => handlePublishList(event, store.currentList._id)}
                    >
                        {"PUBLISH"}
                    </Button>
                    </div>

                </Grid>
                
            </Grid>
        </div>
    )
}

export default WorkspaceScreen;