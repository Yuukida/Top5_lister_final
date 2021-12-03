import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AuthContext from '../auth';
import ExpandedListCard from './ExpandedListCard';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expand, setExpand] = useState(false);
    const { attributes } = props;

    function handleEdit(event, id){
        store.setCurrentList(id);
    }

    function handleExpand(event, id) {
        event.stopPropagation();
        if(store.pageType !== "HOME"){
            store.handleViews(id)
        }
        setExpand(true);
    }

    function handleShrink(event) {
        event.stopPropagation();
        setExpand(false);
    }

    function handleDeleteList(event, id) {
        store.markListForDeletion(id)
    }
    
    function handleLikeList(event, id) {
        store.likeList(id)
    }

    function handleDislikeList(event, id) {
        store.dislikeList(id)
    }

    let expandedList = "";
    if(expand){
        expandedList = <ExpandedListCard attributes={props.attributes} />
    }

    let expandIcon = "";

    if(expand){
        expandIcon = 
        <IconButton color="inherit" 
            style={{
                height: 5
            }}
            onClick={handleShrink}>
                <KeyboardDoubleArrowUpIcon fontSize="large" ></KeyboardDoubleArrowUpIcon>
            </IconButton>
    }else{
        expandIcon = 
        <IconButton color="inherit" 
        style={{
            height: 5
        }}
        onClick={(event) => handleExpand(event, attributes._id)}>
            <KeyboardDoubleArrowDownIcon fontSize="large" ></KeyboardDoubleArrowDownIcon>
        </IconButton>
    }

    let editOrPublish = 
            <>
            <Typography 
            onClick={(event) => {handleEdit(event, attributes._id)}} 
            sx={{ 
                color: "red", cursor: "pointer", 
                textDecoration: 'underline'
            }}
            >{"Edit"}</Typography>
            <Box sx={{flex: 1}}></Box>
            </>

    let likeDislike = ""
    
    if(attributes.published){
        let date = new Date(attributes.publishDate)
        const month = date.toLocaleString('default', { month: 'short' });
        let day = date.getDate();
        let year = date.getFullYear();
        date = month + " " + day + ", " + year;
        
        editOrPublish = 
            <>
            <Typography sx={{fontWeight: "bold"}}>
                {"Published:\xa0\xa0\xa0"}
            </Typography>
            <Typography sx={{flex:0.94, color: "green", fontWeight: "bold"}}>
                {date}
            </Typography>
            </>
        
        likeDislike = 
        <>
            <IconButton
            color="inherit"
            style={{
                position:"relative",
                right: 40,
                bottom:5
            }}
            onClick={(event) => handleLikeList(event, attributes._id)}
            >
                {attributes.likedUsers.includes(auth.user?.userId) ? <ThumbUpAltIcon fontSize="large"></ThumbUpAltIcon> :<ThumbUpOutlinedIcon fontSize="large"></ThumbUpOutlinedIcon>}
            </IconButton>
            <Typography 
            sx={{fontWeight: "bold", fontSize: 15}} 
            style={{
                position:"relative",
                right: 40,
                bottom:5
            }}>{attributes.likes}</Typography>
            <IconButton
            color="inherit"
            style={{
                position:"relative",
                right: 30,
                bottom:5
            }}
            onClick={(event) => handleDislikeList(event, attributes._id)}>
                {attributes.dislikedUsers.includes(auth.user?.userId) ? <ThumbDownAltIcon fontSize="large"></ThumbDownAltIcon> : <ThumbDownOutlinedIcon fontSize="large"></ThumbDownOutlinedIcon>}
            </IconButton>
            <Typography 
            sx={{fontWeight: "bold", fontSize: 15}}
            style={{
                position:"relative",
                right: 30,
                bottom:5
            }}>{attributes.dislikes}</Typography>
        </>
    }


    let bgcolor = "";
    if(auth.loggedIn){
        bgcolor = attributes.ownerId === auth.user.userId ? "#fffff1" : "#d4d4f5";
        bgcolor = attributes.published ? "#d4d4f5" : "#fffff1";
    }else if(auth.isGuest){
        bgcolor = "#d4d4f5"
        likeDislike = ""
    }
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
            style={{ backgroundColor: bgcolor }}
        >
                
            
            <Typography sx={{flexGrow:1, fontWeight:"bold", fontSize: 20,}}>{attributes.name} <br/>{"By:\xa0\xa0\xa0" + attributes.ownerId}</Typography>
            
            {likeDislike}
            {store.pageType === "HOME" ? <IconButton
            color="inherit"
            style={{
                position:"relative",
                left: 10,
                bottom:5
            }}
            onClick={(event) => {handleDeleteList(event, attributes._id)}}
            >
                <DeleteOutlinedIcon fontSize="large"></DeleteOutlinedIcon>
            </IconButton> : 
            <Box sx={{width: "3.85%"}}>

            </Box>}
            
            <Box sx={{width: "100%"}}></Box>
            {expandedList}
            <Box sx={{width: "100%"}}></Box>


            {editOrPublish}         
            

            {attributes.published? <Typography  sx={{flex:0.135, fontWeight:"bold"}}>{views}</Typography>: ""}

            {expandIcon}

                
        </ListItem>

    return (
        cardElement
    );
}

export default ListCard;