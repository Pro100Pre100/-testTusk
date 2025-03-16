import { useEffect, useState } from 'react'
import './App.css'
import SeminarCard from './components/SeminarCard'
import { getSeminars } from './api/seminars'
import { seminarsState } from './interfaces/seminars'
import { Alert, CircularProgress, Grid2 } from '@mui/material'
import DeleteModal from './components/DeleteModal'
import { useNavigate } from 'react-router-dom'
import EditModal from './components/EditModal'

function App() {

  const [seminars, setSeminars] = useState<seminarsState[]>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [updateSeminars, setUpdateSeminars] = useState<boolean>(true);

  const navigate = useNavigate();

  //update list function

  const enableUpdateSeminars = () => {
    setUpdateSeminars(true);
  }

  useEffect(() => {
    try {
      if (updateSeminars) {
        const test = async () => {
          //await new seminars
          setSeminars([]);

          const result = await getSeminars();
          setSeminars(result);
        }
        test();
      }
    }
    catch (error) {
      setError(true);
      console.error(error);
    }
    finally {
      setUpdateSeminars(false);
    }
  }, [updateSeminars])

  window.onbeforeunload = () => {
    navigate('/', { state: null })
  }

  //clear state after close the modal

  useEffect(() => {
    if (!deleteModal && !editModal) {
      navigate('/');
    }
  }, [deleteModal, editModal])

  const closeModals = () => {
    setEditModal(false);
    setDeleteModal(false);
    navigate('')
  };

  const openDeleteModal = (id: string, index: number) => () => {
    setDeleteModal(true);
    navigate('/', { state: { id, index } })
  };

  const openEditModal = (id: string, index: number) => () => {
    setEditModal(true);
    navigate('/', { state: { id, index } })
  };

  return (
    <div className='seminarContainer'>
      {error
        ? <CircularProgress />
        : seminars.length
          ? <>
            <DeleteModal open={deleteModal} handleClose={closeModals} enableUpdateSeminars={enableUpdateSeminars} />
            <EditModal open={editModal} handleClose={closeModals} seminars={seminars} enableUpdateSeminars={enableUpdateSeminars} />
            <Grid2 container spacing={2}
              sx={{
                display: "grid",
                overflowY: 'auto',
                width: '95%',
                height: '95%',
                border: '2px solid black',
                borderRadius: '10px',
                padding: '10px',
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}>
              {seminars.map(({ id, photo, title, description }, index) =>
                <SeminarCard
                  key={id}
                  img={photo}
                  title={title}
                  description={description}
                  handleDelete={openDeleteModal(id, index)}
                  handleEdit={openEditModal(id, index)}
                />)}
            </Grid2>
          </>
          : <Alert severity="error">Error Error on server side</Alert>}
    </div>
  )
}

export default App
