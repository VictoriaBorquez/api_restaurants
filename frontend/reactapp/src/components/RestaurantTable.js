import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import UpdateRestaurantModal from './UpdateRestaurantModal';
import CreateRestaurantModal from './CreateRestaurantModal';
import SwapVertIcon from '@mui/icons-material/SwapVert';

export function RestaurantTable() {
    const [restaurants, setRestaurants] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);


    useEffect(() => {
      async function fetchData() {
        const response = await axios.get('http://0.0.0.0:8000/restaurants', {
            params: {
                sort_column: sortColumn,
                sort_order: sortOrder,
              },
        });
        setRestaurants(response.data);
      }
      fetchData();
    }, [sortColumn, sortOrder]);

    const deleteRestaurant = (id) => {
        axios.delete(`http://0.0.0.0:8000/restaurants/${id}`)
          .then(response => {
            alert("Se ha eliminado correctamente el restaurante.")
            window.location.reload();
          })
          .catch(error => {
            alert("Error: No se ha podido eliminar el restaurante.")
          });
    };

    const handleUpdateRestaurant = (updatedRestaurant) => {
        const updatedRestaurants = restaurants.map((restaurant) => {
          if (restaurant.id === updatedRestaurant.id) {
            return updatedRestaurant;
          }
          return restaurant;
        });
        setRestaurants(updatedRestaurants);
        window.location.reload();
      };

      const handleCreate = (newRestaurant) => {
        axios.post('http://0.0.0.0:8000/restaurants/', newRestaurant)
            .then(response => {
                alert('Restaurante creado exitosamente')
                handleClose(); 
                window.location.reload();
            })
            .catch(error =>{
                alert("Error: No se ha podido crear el restaurante.")
            });
      };

      const handleOpen = () => {
        setOpen(true);
      };

    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSort = (column) => {
        if (sortColumn === column) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(column);
          setSortOrder("asc");
        }
      };


    return (
        <TableContainer component={Paper}>
            <h1><RestaurantIcon/>  Tabla de Restaurantes <RestaurantIcon/> </h1>
            <Button variant="contained" startIcon={<AddCircleIcon />} color="success" onClick={handleOpen}>
                Agregar Restaurant
            </Button>
            <CreateRestaurantModal
                open={open}
                onClose={handleClose}
                onCreate={handleCreate}
            />


            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell align="right" >
                            Nombre Restaurante
                            <IconButton size="large">
                                <SwapVertIcon fontSize="inherit" onClick={() => handleSort("name")}/>
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            Ubicación
                            <IconButton size="large">
                                <SwapVertIcon fontSize="inherit" onClick={() => handleSort("location")}/>
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            Tipo de comida
                            <IconButton size="large">
                                <SwapVertIcon fontSize="inherit" onClick={() => handleSort("type_food")}/>
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            Calificación
                            <IconButton size="large">
                                <SwapVertIcon fontSize="inherit" onClick={() => handleSort("calification")}/>
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            Visitado
                        </TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {restaurants.map(restaurant => (
                    <TableRow key={restaurant.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="right">{restaurant.name}</TableCell>
                        <TableCell align="right">{restaurant.location}</TableCell>
                        <TableCell align="right">{restaurant.type_food}</TableCell>
                        <TableCell align="right">{restaurant.calification}</TableCell>
                        <TableCell align="right">{restaurant.visited ? <Checkbox checked={true}/> : <Checkbox checked={false}/>}</TableCell>
                        <TableCell align="right">
                            <UpdateRestaurantModal restaurant={restaurant} onUpdate={handleUpdateRestaurant} />
                            <IconButton aria-label="delete" size="large">
                                <DeleteIcon fontSize="inherit" color="error" onClick={() => deleteRestaurant(restaurant.id)}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
