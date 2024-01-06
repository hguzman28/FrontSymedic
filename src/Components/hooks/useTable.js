import {  toast } from 'react-toastify';
import { useState, useEffect } from 'react';

export const Usetable = ( initialForm={} ) => {

    const [data, setData] = useState([]);
    
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);

    const [dataSeleccionado, setDataSeleccionado] = useState(initialForm);
  


    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/select`);
        const json = await res.json();
  
        setData(json['data']);
  
      };
      fetchData();
    }, [data]);
  
    const handleDelete = async (nombre) => {

      
        try {
          const res = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/delete/${nombre}`, {
            method: 'DELETE',
          });
          const json = await res.json();
    
          if (json.statusCode===200) {
        
            setData(data.filter((item) => item.nombre !== nombre));
            toast.success("Registro eliminado")
          }
        } catch (error) {
          console.log(error);
          toast.error("Ha ocurrido un error")
        }
      };


      const handleUpdate = async (dataSeleccionado) => {

      
        try {
          console.log(dataSeleccionado)
          const res = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataSeleccionado)
          });
          const json = await res.json();
    
          if (json.statusCode===200) {
        
            setData(data.filter((item) => item.nombre !== dataSeleccionado.nombre));
            toast.success("Registro Actualizado")
          }
        } catch (error) {
          console.log(error);
          toast.error("Ha ocurrido un error")
        }
      };


  return {
    data,
    setData,
    handleDelete,
    handleUpdate,
    setDataSeleccionado,
    dataSeleccionado,
    setModalInsertar,
    modalInsertar,
    setModalEliminar,
    modalEliminar,
    setModalEditar,
    modalEditar

  }
   
  
}
