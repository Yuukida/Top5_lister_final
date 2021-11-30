import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import AuthContext from '../auth';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expand, setExpand] = useState(false);
    const { attributes } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled && !store.isListNameEditActive) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleEdit(event, id){

    }

    function handleExpand(event, id) {

    }

    function handleShrink(event, id) {

    }

    function handleDeleteList(event, id) {

    }
    
    let bgcolor = attributes.ownerId === auth.user.userId ? "#fffff1" : "#d4d4f5";
    let views = 'Views:\xa0\xa0\xa0' + attributes.views;
    let cardElement =
        <ListItem
            id={attributes._id}
            key={attributes._id}
            sx={{ 
                marginTop: '15px', 
                display: 'flex', 
                p: 1, 
                borderRadius: 2, 
                borderColor:"black",
                border: 2,
                flexWrap: "wrap",
            }}
            onClick={(event) => {handleLoadList(event, attributes._id)}}
            button
            style={{ backgroundColor: bgcolor }}
        >
                
            
            <Typography sx={{flexGrow:1, fontWeight:"bold"}}>{attributes.name} <br/>{"By:\xa0\xa0\xa0" + attributes.ownerId}</Typography>
            
            <IconButton
            color="inherit"
            style={{
                position:"relative",
                right: 40,
                bottom:5
            }}
            >
                <ThumbUpOutlinedIcon fontSize="large"></ThumbUpOutlinedIcon>
            </IconButton>
            <Typography 
            sx={{fontWeight: "bold", fontSize: 15}} 
            style={{
                position:"relative",
                right: 40,
                bottom:5
            }}>{attributes.dislike}</Typography>
            <IconButton
            color="inherit"
            style={{
                position:"relative",
                right: 30,
                bottom:5
            }}>
                <ThumbDownOutlinedIcon fontSize="large"></ThumbDownOutlinedIcon>
            </IconButton>
            <Typography 
            sx={{fontWeight: "bold", fontSize: 15}}
            style={{
                position:"relative",
                right: 30,
                bottom:5
            }}>{attributes.dislike}</Typography>
            <IconButton
            color="inherit"
            style={{
                position:"relative",
                left: 10,
                bottom:5
            }}
            onclick={(event) => {handleDeleteList(event, attributes._id)}}
            >
                <DeleteOutlinedIcon fontSize="large"></DeleteOutlinedIcon>
            </IconButton>
            
            <Box sx={{width: "100%"}}></Box>

            
            <Link sx={{flex:1, color: "red"}}>{"Edit"}</Link>         
            
                           
            <Typography  sx={{flex:0.135, fontWeight:"bold"}}>{views}</Typography>

            <IconButton color="inherit" splashSize="2" 
            style={{
                height: 5
            }}>
                <ExpandMoreIcon fontSize="large" ></ExpandMoreIcon>
            </IconButton>    

                
        </ListItem>

    return (
        cardElement
    );
}

export default ListCard;