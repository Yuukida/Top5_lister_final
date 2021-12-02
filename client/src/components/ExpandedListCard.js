import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import InputBase from '@mui/material/InputBase';


function ExpandedListCard(props) {

    const {attributes} = props;

    const handleFocusComment = (event) => {
        event.stopPropagation();
    }
    
    let itemList = attributes.items.map( (item, index) => 
            <Typography sx={{fontWeight: "bold", color: "#c7a53a", fontSize: 25, m:1,}}>{index+1+". " + item}</Typography>
    )
    let commentList = attributes.comments.map( (comment) => 
            <ListItem 
            sx={{
                backgroundColor: "#c7a53a", 
                borderRadius:1, 
                m:1, 
                border:1, 
                display: "flex", 
                flexDirection: "column", 
                width: "95%",
                alignItems: "flex-start"
            }}>
                <Typography sx={{fontSize:15, color: "blue"}}>{comment[0]}</Typography>
                <Typography sx={{fontSize:20,}}>{comment[1]}</Typography>
            </ListItem>
    )

    let comment = "";
    if(attributes.published){
        comment = 
        <InputBase
                        sx={{backgroundColor: "white", height:40, width:"95%", borderRadius: 2}}
                        placeholder="Comment"
                        onClick={handleFocusComment}
                    />
    }
    return(
        <Grid container sx={{display:"flex", justifyContent: "center"}}>
            <Box sx={{backgroundColor: "#2c2f70", width: "48%", borderRadius:2 , m:1}}>
                {itemList}
            </Box>

            <Box sx={{width: "48%", m:1, display:"flex", flexDirection: "column"}}>
                <Box style={{maxHeight: 200, overflowY: 'auto', flex:1}} >
                    <List >
                        {commentList}
                    </List>
                    
                </Box>
                {comment}
            </Box>
            
            
        </Grid>

    )
}

export default ExpandedListCard