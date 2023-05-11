import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

function UpdateRestaurantModal({ restaurant, onUpdate }) {
    
    const [open, setOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState({});

    const handleOpen = () => {
      setUpdatedData({ 
        name: restaurant.name, 
        location: restaurant.location, 
        type_food: restaurant.type_food,
        calification: restaurant.calification,
        visited: restaurant.visited
    });
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleInputChange = (e) => {
      setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };
  
    const handleUpdate = () => {
        fetch(`http://0.0.0.0:8000/restaurants/${restaurant.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then((response) => response.json())
          .then((data) => {
            onUpdate(data);
            setOpen(false);
          })
          .catch((error) => {
            console.error('Error al actualizar el restaurante:', error);
          });
      };

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
      
    return (
        <div>
        <IconButton aria-label="delete" size="large">
          <EditIcon fontSize="inherit" color="primary" onClick={handleOpen}/>
        </IconButton>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box component="form" sx={style}>
            <div>
              <h2>Actualizar Restaurante</h2>
              <TextField name="name" label="Nombre" value={updatedData.name || ''} onChange={handleInputChange} />
              <TextField name="location" label="Ubicación" value={updatedData.location || ''} onChange={handleInputChange} />
              <TextField name="type_food" label="Tipo de comida" value={updatedData.type_food || ''} onChange={handleInputChange} />
              <TextField name="calification" label="Calificación" value={updatedData.calification || ''} onChange={handleInputChange} />
              <Button variant="contained" color="success" onClick={handleUpdate}>
                Guardar
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
      
}
export default UpdateRestaurantModal;
