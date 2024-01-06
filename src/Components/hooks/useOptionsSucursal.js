import { useEffect, useState } from "react";


export const useOptionsSucursal = (metodo) => {
  const [options, setoptions] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/${metodo}`);
      const json = await res.json();
      console.log("##### START Useoptions2j.js ###");
      console.log(metodo);
      console.log(json);
      const transformedData = json.data.map(item => ({
        value: item["codage"],
        label: item["nomage"],
        tipo: item["tipocons"],
      }));

      setoptions(transformedData);
    };

    fetchData();
    // console.log(options);
    console.log("##### END");

  }, [metodo]);

  return {
    options,
    setoptions,
  };
};