import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    textAlign: "center",
    border: 1,
    borderRadius: 1,
    borderColor: 'error.main',
  };

function DeleteModal () {
    const { store } = useContext(GlobalStoreContext);

    function handleDeleteList(event) {
        store.deleteMarkedList();
    }

    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }
    let name = "";
    let open = false;
    if(store.listMarkedForDeletion){
        name = store.listMarkedForDeletion.name;
        open=true
    }

    return(
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal is-visible" variant="h5" component="h3">
            Delete the {name} Top 5 List?
          </Typography>
          <Button variant="text" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="text" onClick={handleDeleteList}>Confirm</Button>

        </Box>
        
      </Modal>
    )
}

export default DeleteModal;