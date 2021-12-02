import { useContext, useEffect, useState } from 'react'
import { stepperClasses, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import NavBar from './NavBar';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import AuthContext from '../auth';
import { TextField } from '@mui/material';

function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [flag, setFlag] = useState(false);
    useEffect(async () => {
        console.log("effect")
       
        // let log = await auth.getLoggedIn();
        // if(log){
        //     let id = store.getListId();
        //     await store.setCurrentList(id)
        // }else{
        //     store.welcomePage()
        // } 
        handleListNameChange() 

    }, []);

    const [publish, setPublish] = useState(!store?.currentList?.published);
    const handleSaveList = (event) => {
        store.closeCurrentList();
    }

    const handleListNameChange = (event) => {
        let sameLists = store.currentLists.filter((list) => {
            return (list.name === store?.currentList?.name) && list.published
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
            sx={{backgroundColor: "#2c2f70", width: "97%",  borderRadius: 2, height: "79%", display: "flex", flexDirection:"column"}}
            >
                {
                    
                    store.currentList.items.map((item, index) => (
                        <Box sx={{width: "100%", display: "flex", flex:1}}>
                        <InputBase
                            value={index+1 + ". "}
                            sx={{m:1, backgroundColor: "#d5b240", border:1, borderRadius:2, width: 80,  fontSize: 40, }}
                            
                            inputProps={{
                                style: {
                                    fontWeight: "bold",
                                    textAlign: 'center',
                                }
                            }}
                            key={"item" + index}
                            readOnly
                        />
                        <InputBase
                        sx={{m:1, backgroundColor: "#d5b240", border:1, borderRadius:2, width: '90%', flex:1}}
                        defaultValue={item}
                        inputProps={{ style: { fontSize: 40, marginLeft: 10} }}
                        />
                        </Box>
                    ))
                    
                }
                </Box>;
    }
    
    let listName = store?.currentList?.name;
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
                        defaultValue={listName}
                        sx={{ m:1, backgroundColor: "white", width: "50%", fontWeight: "bold", fontSize:18}}
                        onChange={handleListNameChange}
                    />
                    </Grid>
                    {editItems}
                        
                    
                    <Grid container
                        sx={{width:"97%", height: "100%", justifyContent:"right", display:"flex", m:1,  }}
                    >
                    <Button
                    sx={{
                        backgroundColor: "#dddddd", 
                        color: "black", 
                        fontWeight: "bold", 
                        fontSize: 20, 
                        border:1, 
                        borderRadius:2, 
                        height:"8%",
                        width: "10%",
                     }}
                     onClick={handleSaveList}
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
                        height:"8%",
                        width: "10%",
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