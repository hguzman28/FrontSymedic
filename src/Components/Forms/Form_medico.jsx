import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForms } from "../hooks/useForms";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { Form, Button } from 'react-bootstrap';


const Form_medico = ({ initialForm }) => {

  const { formState, onChangeForm, onDateChange, onSendForm, optionsVirtualize } = useForms(initialForm);
  const { username, email, fecha } = formState;
  const { OpcionesOrder, MenuList, handleChange, selectedOption } = optionsVirtualize;
  

  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={onChangeForm} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={onChangeForm} />
      </Form.Group>

      <Form.Group controlId="formBasicDate">
        <Form.Label>Fecha</Form.Label>
        <br />
        <DatePicker
          selected={fecha}
          onChange={onDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Seleccione una fecha"
          className="form-control"
        />
      </Form.Group>

      <Form.Group controlId="formBasicOption">
        <Form.Label>Opción</Form.Label>
        <VirtualizedSelect
          options={OpcionesOrder}
          value={selectedOption}
          onChange={handleChange}
          components={{ MenuList }}
          isSearchable={true}
          placeholder="Seleccione una opción 👇"
        />
      </Form.Group>

      <Button variant="primary" onClick={onSendForm}>
        Guardar
      </Button>

      <ToastContainer />
    </Form>
  );
};

export default Form_medico;
