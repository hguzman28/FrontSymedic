import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { Form,Button,Modal } from 'react-bootstrap';
import Labordenpago from './Labordenpago';
// import { Form, Button,Tab,Tabs } from 'react-bootstrap';

const columns = [
  {
    dataField: 'examen',
    text: 'Examen'
  },
  {
    dataField: 'nameExamen',
    text: 'Nombre Examén'
  },
  {
    dataField: 'valor',
    text: 'Valor',
    editable: true
  },
  {
    dataField: 'Dep',
    text: 'Dep'
  },
  {
    dataField: 'DescE',
    text: 'DescE'
  },
  {
    dataField: 'DescP',
    text: 'DescP'
  },
  {
    dataField: 'Recaudo',
    text: 'Recaudo'
  },
  {
    dataField: 'Cuota',
    text: 'Cuota'
  },
  {
    dataField: 'S',
    text: 'S',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N',
    },
    classes: 'small-checkbox'
    // formatter: (cell, row) => <CheckboxEditor value={cell} row={row} />
  },
  {
    dataField: 'Detalle',
    text: 'Detalle'
  },
  {
    dataField: 'Par',
    text: 'Par',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N',
    },
    classes: 'small-checkbox'
    // formatter: (cell, row) => <CheckboxEditor value={cell} row={row} />
  },
  {
  dataField: 'Cor',
  text: 'Cor',
  editor: {
    type: Type.CHECKBOX,
    value: 'Y:N',
  },
  classes: 'small-checkbox'
  // formatter: (cell, row) => <CheckboxEditor value={cell} row={row} />
},

];

const data = [
  {
    id: 1,
    name: '',
    age: 0,
    examen: '',
    Cor: '',
    Par: '',
    Detalle: '',
    S: '',
    Cuota: '',
    Recaudo: '',
    DescP: '',
    DescE: '',
    Dep: '',
    valor: 0,
    nameExamen: ''
  },
  {
    id: 2,
    name: '',
    age: 0,
    examen: '',
    Cor: '',
    Par: '',
    Detalle: '',
    S: '',
    Cuota: '',
    Recaudo: '',
    DescP: '',
    DescE: '',
    Dep: '',
    valor: 0,
    nameExamen: ''
  },
  {
    id: 3,
    name: '',
    age: 0,
    examen: '',
    Cor: '',
    Par: '',
    Detalle: '',
    S: '',
    Cuota: '',
    Recaudo: '',
    DescP: '',
    DescE: '',
    Dep: '',
    valor: 0,
    nameExamen: ''
  }
];


const Liquidacion = () => {
  const [gridData, setGridData] = useState(data);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const calculateTotalSum = () => {
    console.log("Vamos hacer calculateTotalSum:");
    
    const sum = gridData.reduce((accumulator, item) => {
      const valor = parseFloat(item.valor) || 0;
      const descuentoP = parseFloat(item.DescP) || 0;
      const descuentoE = parseFloat(item.DescE) || 0;
      const Subtotal1 = valor - descuentoP
      const total = Subtotal1 * (1 - descuentoE / 100);
      console.log("valor: " + valor)
      console.log("descuentoP: "+ descuentoP);
      console.log("Total: "+ total)
      console.log("accumulator + total: "+accumulator);
      return accumulator + total;
    }, 0);
    console.log("Sum: ");
    console.log(sum);
    setTotalWithDiscount(sum);
  };
   
  const handleDescEChange = (newValue, rowId) => {
    const updatedData = gridData.map(row => {
      if (row.id === rowId) {
        console.log("row.id === rowId")
        const valor = parseFloat(row.valor) || 0;
        const descuento = parseFloat(newValue) || 0;
        const total = valor * (1 - descuento / 100);
        return { ...row, DescE: newValue };
      }
      return row;
    });
  
    setGridData(updatedData);
  };
   

  const handleTableChange = async (type, { data, cellEdit }) => {
    console.log("handleTableChange");
    // calculateTotalSum();
  
    if (type === 'cellEdit' && cellEdit && cellEdit.rowId && cellEdit.dataField && cellEdit.newValue) {
      const { rowId, dataField, newValue } = cellEdit;
  
      if (dataField === 'examen') {
        console.log("dataField: "+dataField)
        try {
          const response = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/precio/find/2919/1/`+newValue);
          if (!response.ok) {
            throw new Error('Request failed');
          }
  
          const responseservices = await response.json();

          console.log(responseservices)
          const { nombre, valor, descuento } = responseservices;
  
          const updatedData = data.map(row => {
            if (row.id === rowId) {
              return { ...row, [dataField]: newValue, nameExamen: nombre, valor: valor,DescP: descuento};
            }
            return row;
          });
  
          setGridData(updatedData);
          // calculateTotalSum();
        } catch (error) {
          console.log('Error:', error);
        }
      } else if (dataField === 'DescE') {
        console.log("dataField: "+dataField)
        handleDescEChange(newValue, rowId);
      } else {
        // Otros campos de la grilla
      }
    }
    else {
      console.log("Else handleTableChange")
    }
  };
  
  
  
  

  useEffect(() => {
    console.log("Entro en el useEffect cada vez q se modifique gridData");
    calculateTotalSum();
  }, [gridData]);

  const handlePagoClick = () => {
    setShowModal(true);
  };
  
  return (
<>

<Form.Group className="row">
  <Form.Label className="col">Copago</Form.Label>
  <div className="col-sm-2">
    <Form.Control type="text" style={{ height: '30px', width: '100px' }} placeholder="" name="Copago"  value="0"/>
  </div>
  <Form.Label className="col">Total CM</Form.Label>
  <div className="col-sm-2">
    <Form.Control type="text" style={{ height: '30px', width: '100px' }} placeholder="" value="" name="totalcm" value="0"/>
  </div>
  <Form.Label className="col">Bono</Form.Label>
  <div className="col-sm-2">
    <Form.Control type="text" style={{ height: '30px', width: '100px' }} placeholder="" value="" name="bono" value="0"/>
  </div>

</Form.Group>

<Form.Group className="row">

<Form.Label className="col">Dco Paciente</Form.Label>
  <div className="col-sm-2">
    <Form.Control type="text" style={{ height: '30px', width: '100px' }} placeholder="" value="" name="dcopaciente" />
  </div>
  <Form.Label className="col">CodBono</Form.Label>
  <div className="col-sm-2">
    <Form.Control type="text" style={{ height: '30px', width: '100px' }} placeholder="" value="" name="codbono" value="0"/>
  </div>
  <Form.Label className="col">ValorBonoDesc</Form.Label>
  <div className="col-sm-2">
    <Form.Control type="text" style={{ height: '30px', width: '100px' }} placeholder="" value="" name="valorbonodesc" value="0"/>
  </div>

</Form.Group>



<BootstrapTable
        keyField="id"
        data={gridData}
        columns={columns}
        cellEdit={cellEditFactory({ mode: 'click', blurToSave: true})}
        remote={{
          cellEdit: true
        }}
        onTableChange={handleTableChange}
      />
<Form.Group className="row">


  <Form.Label className="col">Total</Form.Label>
  <div className="col-sm-6">
      <Form.Control
      type="text"
      style={{ height: '30px', width: '100px' }}
      placeholder="total"
      value={totalWithDiscount.toString()}
      name="total"
    />
  </div>

  <div className="col-sm-5">
  <Button variant="primary" onClick={handlePagoClick}>
        Pago
  </Button>
  </div>


</Form.Group>

<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Labordenpago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Labordenpago miage="72" miord="4545" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
</Modal>







</>    

  );
}

export default Liquidacion;
