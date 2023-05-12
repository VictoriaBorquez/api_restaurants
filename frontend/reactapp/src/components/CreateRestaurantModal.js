import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const CreateRestaurantModal = ({ open, onClose, onCreate }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type_food, setTypeFood] = useState('');
  const [calification, setCalification] = useState('');
  const [visited, setVisited] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    m:2,
    p: 4,
    
  };

  const handleCreate = () => {
    const newRestaurant = {
      id,
      name,
      location,
      type_food,
      calification,
      visited,
    };

    onCreate(newRestaurant);
    setId('');
    setName('');
    setLocation('');
    setTypeFood('');
    setCalification('');
    setVisited('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box component="form" sx={style}>

        
      <div>
        <h2>Crear Restaurante</h2>
        <TextField
          label="Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tipo de comida"
          value={type_food}
          onChange={(e) => setTypeFood(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Calificación"
          value={calification}
          onChange={(e) => setCalification(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Visitado"
          value={visited}
          onChange={(e) => setVisited(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear
        </Button>
      </div>
      </Box>
    </Modal>

  );
};

export default CreateRestaurantModal;
