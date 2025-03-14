import { Backdrop, Box, Button, CircularProgress, Fade, InputLabel, Modal, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { editModalProps, seminarInfoState } from "../interfaces/seminars";
import { ChangeEvent, useEffect, useState } from "react";
import { changeSeminar } from "../api/seminars";

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

export default function EditModal({ enableUpdateSeminars, open, seminars, handleClose }: editModalProps) {

  const [seminarInfo, setSeminarInfo] = useState<seminarInfoState>({ title: null, description: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setSeminarInfo({
        title: seminars[state.index].title,
        description: seminars[state.index].description
      })
    }
  }, [state])

  const sendChanges = (changes: seminarInfoState) => async () => {
    try {
      if (state) {
        setIsLoading(true);
        await changeSeminar({
          title: changes.title!,
          description: changes.description!
        }, +state.id);
        enableUpdateSeminars();
        handleClose();
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false)
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
              ? <CircularProgress sx={{ alignSelf: 'center' }} />
              : <><TextField
                id="outlined-basic"
                label="Title"
                value={seminarInfo.title}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSeminarInfo({ ...seminarInfo, title: event.target.value })}
                sx={{
                  margin: '10px',
                  '& .MuiInputLabel-root': {
                    transform: 'translate(13px, -10px) scale(0.8)',
                  }
                }}
              >
                <InputLabel shrink={true} />
              </TextField>

                <TextField
                  label="Multiline"
                  multiline
                  rows={4}
                  value={seminarInfo.description}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setSeminarInfo({ ...seminarInfo, description: event.target.value })}
                  sx={{
                    margin: '10px',
                    '& .MuiInputLabel-root': {
                      transform: 'translate(13px, -10px) scale(0.8)',
                    }
                  }}
                >
                </TextField>

                <Button variant="contained" sx={{ margin: '10px' }} onClick={sendChanges(seminarInfo)}>Save changes</Button>
              </>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}