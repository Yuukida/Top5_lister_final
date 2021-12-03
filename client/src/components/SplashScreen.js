import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';
import { useContext } from 'react';


export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    const handleGuest = () => {
        auth.signInGuest()
    }

    return (
        <div id="splash-screen" >
            <Box sx={{m: -5}}>
                <Typography align="center" sx={{fontSize:30, color: "#841acb"}}>Share with the World</Typography>

            </Box>
            <Box sx={{p: 5}}>
                <Typography align="center" variant="h1" sx={{ color: "#d5b240"}}>The Top 5 Lister</Typography>
                <Typography align="center" sx={{color: "#841acb", }}>Developed by: Haoran Weng</Typography>
            </Box>
            <Box sx={{m:-3}}>
                <Typography align="center" sx={{fontSize:20, color: "#841acb", fontWeight: 'bold' }}>A website that let's you create, share, and <br/> view you and your friends favorites, from <br/> music to video games</Typography>
            </Box>
            <Box textAlign="center" sx={{p:10}}>
                <Button variant="text" sx={{ fontSize:20}} component={Link} to="/register/">Create Account</Button> <br/>
                <Button variant="text" sx={{ fontSize:20}} component={Link} to="/login/">Login</Button> <br/>
                <Button variant="text" sx={{ fontSize:20}} onClick={handleGuest}>Continue as Guest</Button>
            </Box>
            
        </div>
    )
}