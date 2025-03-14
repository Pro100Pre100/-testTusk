import { Backdrop, Box, Button, CircularProgress, Fade, Modal, Typography } from "@mui/material";
import { deleteModalProps } from "../interfaces/seminars";
import { useLocation } from "react-router-dom";
import { deleteSeminar } from "../api/seminars";
import { useState } from "react";

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ enableUpdateSeminars, open, handleClose }: deleteModalProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { state } = useLocation();

  //delete logic

  const clickHandler = async () => {
    try {
      setIsLoading(true);
      await deleteSeminar(state.id);
      enableUpdateSeminars();
      handleClose();
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {isLoading
              ? <CircularProgress sx={{alignSelf: 'center'}}/>
              : <><Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: 'center' }}
              >
                Are you sure you want to delete this seminar?
              </Typography>
                <Button variant="contained" sx={{ margin: '10px' }} onClick={clickHandler}>Delete</Button>
              </>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}