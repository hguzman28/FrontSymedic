import { useEffect, useState } from "react";


export const useOptions = (metodo,codagePropName, nomagePropName) => {
  const [options, setoptions] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/${metodo}`);
      const json = await res.json();
      console.log("##### START Useoptionsj.js ###");
      console.log(metodo);
      console.log(json);
      console.log(codagePropName,nomagePropName);
      const transformedData = json.data.map(item => ({
        value: item[codagePropName],
        label: item[nomagePropName],
      }));

      setoptions(transformedData);
    };

    fetchData();
    // console.log(options);
    console.log("##### END");

  }, [metodo,codagePropName,nomagePropName]);

  return {
    options,
    setoptions,
  };
};