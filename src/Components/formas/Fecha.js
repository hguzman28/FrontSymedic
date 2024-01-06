import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import DatePicker from "./Datepicker";

export default function Fecha(props) {
  const [dateString, setDateString] = useState(props.valor);
  const handleDateChange = value => setDateString(value);
  const inputStyle = {
    height: "30px",
    padding: "5px"
  };

  return (
    <div className="App">
      <DatePicker 
        {...{
          inputStyle,
          handleDateChange,
          value: dateString,
          format: "DD/MM/YYYY",
          id: props.id,
          name: props.name ,
          modvalue: props.modvalue
        }} 
      />
    </div>
  );
}