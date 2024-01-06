import React, { useState } from 'react';

function Combo(props) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {

    alert(event.target.value);

    setSelectedValue(event.target.value);

    this.state.form.pais = event.target.value

    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  const options = props.options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.nombre}
    </option>
  ));

  return (
    <div>
      <label htmlFor={props.id}>{props.name}:</label>
      <select id={props.id} name={props.name} value={selectedValue} onChange={handleChange}>
        {options}
      </select>
    </div>
  );
}

export default Combo;