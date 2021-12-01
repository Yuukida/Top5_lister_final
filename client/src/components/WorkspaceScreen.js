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
    const [publish, setPublish] = useState(!store.currentList.published);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        handleListNameChange()
        store.load();
    }, []);

    const handleSaveList = (event) => {
        store.closeCurrentList()
    }

    const handleListNameChange = (event) => {
        let sameLists = store.currentLists.filter((list) => {
            return (list.name === store.currentList.name) && list.published
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


    let editItems = "";
    
    if (store.currentList) {
        editItems = 
            <Box
            sx={{backgroundColor: "#2c2f70", width: "97%", m:0.5, borderRadius: 2, height: "79%"}}
            >
                {
                    
                    store.currentList.items.map((item, index) => (
                        <>
                        <InputBase
                            value={index+1 + ". "}
                            sx={{m:1, backgroundColor: "#d5b240", border:1, borderRadius:2, width: 80, height: 80, fontSize: 40, }}
                            
                            inputProps={{
                                style: {
                                    fontWeight: "bold",
                                    textAlign: 'center',
                                    
                                }
                            }}
                            readOnly
                        />
                        <InputBase
                        sx={{m:1, backgroundColor: "#d5b240", border:1, borderRadius:2, width: "91%", height:"16.5%"}}
                        defaultValue={item}
                        inputProps={{ style: { fontSize: 40, marginLeft: 10} }}
                        />
                        </>
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
                        defaultValue={store.currentList.name}
                        sx={{ m:1, backgroundColor: "white", width: "50%", fontWeight: "bold", fontSize:18}}
                        onChange={handleListNameChange}
                    />
                    </Grid>
                    {editItems}
                        
                    
                    <Grid container 
                        sx={{width:"97%", height: "100%", justifyContent:"right" }}
                    >
                    <Button
                    sx={{
                        backgroundColor: "#dddddd", 
                        color: "black", 
                        fontWeight: "bold", 
                        fontSize: 28, 
                        m:0.5, 
                        border:1, 
                        borderRadius:2, 
                        height:"8%",
                        width: "10%",
                        
                     }}
                     onClick={handleSaveList}
                    >
                        {"SAVE"}
                    </Button>
                    <Button
                    sx={{
                        backgroundColor: "#dddddd", 
                        color: "black", 
                        fontWeight: "bold", 
                        fontSize: 28, 
                        m:0.5, 
                        border:1, 
                        borderRadius:2, 
                        height:"8%",
                        width: "10%"
                     }}
                     disabled={publish}
                    >
                        {"PUBLISH"}
                    </Button>
                    </Grid>

                </Grid>
                
            </Grid>
        </div>
    )
}

export default WorkspaceScreen;