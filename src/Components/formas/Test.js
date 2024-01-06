import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForms } from "./hooks/useForms";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import { FixedSizeList } from 'react-window';
// import { List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { useState } from 'react';


const Test = () => {
  const { formState, onChangeForm, onDateChange, onSendForm } = useForms({
    username: '',
    email: '',
    fecha: null
  });
  const { username, email, fecha } = formState;

  const options = [];
  for (let i = 0; i < 10000; i++) {
    options.push({ value: i, label: `Option` });
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };

  const MenuList = (props) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * 35;
    const height = options.length * 35;
    return (
      <FixedSizeList
        height={maxHeight}
        itemCount={children.length}
        itemSize={35}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </FixedSizeList>
    );
  };

  const items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(`Item ${i}`);
  }

  return (
    <>
      <h1>Formulario prueba</h1>
      <input
        type="text"
        className="form-control"
        name="username"
        placeholder="username"
        value={username}
        onChange={onChangeForm}
      />
      <input
        type="email"
        className="form-control mt-2"
        name="email"
        placeholder="email"
        value={email}
        onChange={onChangeForm}
      />
      <DatePicker
        selected={fecha}
        onChange={onDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Seleccione una fecha"
        className="mt-4 "
      />

          <br />
          <VirtualizedSelect
            options={options}
            value={selectedOption}
            onChange={handleChange}
            components={{ MenuList }}
            isSearchable={true}
            className="mt-4 "
            placeholder="Seleccione una opción 👇"
          />
       

      <button onClick={onSendForm} className="btn btn-primary mt-2">
        Guardar
      </button>
      <br></br>
      <ToastContainer />
    </>
  );
};

export default Test;
