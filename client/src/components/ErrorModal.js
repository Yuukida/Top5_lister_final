import { useContext } from 'react'
import AuthContext from '../auth'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 1,
    textAlign: "center",
    border: 1,
    borderRadius: 1,
    borderColor: 'error.main',
};

function ErrorModal () {
    const { auth } = useContext(AuthContext);

    function handleCloseModal(event) {
        auth.closeModal();
    }

    let open = false;
    let msg = "";
    if(auth.errorMsg){
        open = true;
        msg = auth.errorMsg;
    }

    return (
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >

        <Box sx={style}>
          
          <Alert severity="error">{msg}</Alert>
          <Button variant="text" onClick={handleCloseModal}>Confirm</Button>

        </Box>
        
      </Modal>
    )
}

export default ErrorModal;