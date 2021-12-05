import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import InputBase from '@mui/material/InputBase';
import { useState, useContext } from 'react';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth/index.js';


function ExpandedListCard(props) {
    const {attributes} = props;
    const [comment, setComment] = useState("")
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleCommentKeyPress = (event, id) => {
        if(event.code === "Enter"){
            store.postComment(id, comment)
            event.target.value = ""
            setComment("")
        }
    }
 
    const handleCommunityComment = (event, id) =>{
        if(event.code === "Enter"){
            store.postCommunityComment(id, comment)
            event.target.value = ""
            setComment("")
        }
    }

    let itemList = []
    let commentList = attributes.comments.map( (comment, index) => 
            <ListItem 
            key={index}
            sx={{
                backgroundColor: "#c7a53a", 
                borderRadius:1, 
                m:1, 
                border:1, 
                display: "flex", 
                flexDirection: "column", 
                width: "95%",
                alignItems: "flex-start",
                
            }}>
                <Typography sx={{fontSize:15, color: "blue"}}>{comment[0]}</Typography>
                <Typography sx={{fontSize:20,}}>{comment[1]}</Typography>
            </ListItem>
    )

    let comments = "";
    if(attributes.published){
        comments = 
        <InputBase
                        sx={{backgroundColor: "white", height:40, width:"95%", borderRadius: 2}}
                        placeholder="Comment"
                        onChange={handleCommentChange}
                        onKeyPress={(event) => handleCommentKeyPress(event, attributes._id)}
                    />

        itemList = attributes.items.map( (item, index) => 
        <Typography sx={{fontWeight: "bold", color: "#c7a53a", fontSize: 33, m:1,}}>{index+1+". " + item}</Typography>
)
    }
    if(store.pageType === "COMMUNITY") {
        let itemsCount = attributes.itemsCount
        let index = 0;
        for(let key in itemsCount){
            let item = 
                    <>
                    <Typography sx={{fontWeight: "bold", color: "#c7a53a", fontSize: 23, ml:1,}}>{index+1+". " + key} </Typography>
                    <Typography sx={{ color: "#c7a53a", fontSize: 15, ml:1}}>{"(" + itemsCount[key] + " Votes)"}</Typography>
                    </>
                        
            index++;
            itemList.push(item)
            if(index===5){
                break;
            }
        }
        comments =
        <InputBase
                        sx={{backgroundColor: "white", height:40, width:"95%", borderRadius: 2}}
                        placeholder="Comment"
                        onChange={handleCommentChange}
                        onKeyPress={(event) => handleCommunityComment(event, attributes._id)}
                    />
    }
    if(auth.isGuest){
        comments = ""
    }
    return(
        <Grid container sx={{display:"flex", justifyContent: "center"}}>
            <Box sx={{backgroundColor: "#2c2f70", width: "48%", borderRadius:2 , m:1}}>
                {itemList}
            </Box>

            <Box sx={{width: "48%", m:1, display:"flex", flexDirection: "column", height: 300}}>
                <Box style={{ overflowY: 'auto', flex:1}} >
                    <List >
                        {commentList}
                    </List>
                    
                </Box>
                {comments}
            </Box>
            
            
        </Grid>

    )
}

export default ExpandedListCard