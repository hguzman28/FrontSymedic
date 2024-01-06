import React, {useState} from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

//const baseurl ='http://127.0.0.1:8000/';
const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;   


// Define styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    backgroundColor: "#f0f0f0",
    fontSize: 12
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 9,
  },
  tableCell: {
    flex: 1,
    padding: 10,
    color: "#333",
    fontSize: 9,
  },
  body: {
    marginTop: 20,
  },
  group: {
    marginBottom: 20,
  },
  header: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    backgroundColor: "#f0f0f0",
    padding: 10,
    color: "#333",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 9,
  },
  cell: {
    flex: 1,
    padding: 10,
    color: "#333",
    fontFamily: "Helvetica",
    fontSize: 9,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#777",
    marginTop: 20,
  },
});



const Invoiced = ({ resul }) => {



  return (
    <Document>
      <Page style={styles.page}>

      <Text>{resul.ordtop}</Text>
      
      <Text style={styles.title}>Orden de laboratorio {resul.numorden}</Text>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.sectionTitle]}>
              <Text style={styles.tableCell}>Fecha de la orden:</Text>
              <Text style={styles.tableCell}>Hora:</Text>
              <Text style={styles.tableCell}>Contrato:</Text>
              <Text style={styles.tableCell}>TipoIde:</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{resul.fecorden}</Text>
              <Text style={styles.tableCell}>{resul.hora}</Text>
              <Text style={styles.tableCell}>{resul.paciente.contrato}</Text>
              <Text style={styles.tableCell}>{resul.paciente.tipide}</Text>
            </View>
            <View style={[styles.tableRow, styles.sectionTitle]}>
             
              <Text style={styles.tableCell}>Identificacion:</Text>
              <Text style={styles.tableCell}>Nombre:</Text>
              <Text style={styles.tableCell}>TipoPac:</Text>
              <Text style={styles.tableCell}>Sexo:</Text>
            </View>
            <View style={styles.tableRow}>
              
            <Text style={styles.tableCell}>{resul.paciente.codpac}</Text>
              <Text style={styles.tableCell}>{resul.paciente.nombre}</Text>
              <Text style={styles.tableCell}>{resul.paciente.tipide}</Text>
              <Text style={styles.tableCell}>{resul.paciente.sexo}</Text>
            </View>
            <View style={[styles.tableRow, styles.sectionTitle]}>
             
              <Text style={styles.tableCell}>Edad:</Text>
              <Text style={styles.tableCell}>FechaEntr:</Text>
              <Text style={styles.tableCell}>Direccion:</Text>
              <Text style={styles.tableCell}>Telefono:</Text>
              
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{resul.paciente.edad}</Text>
              <Text style={styles.tableCell}>{resul.entrega}</Text>
              <Text style={styles.tableCell}>{resul.paciente.dir}</Text>
              <Text style={styles.tableCell}>{resul.paciente.tel}</Text>
            </View>

            <View style={[styles.tableRow, styles.sectionTitle]}>
              <Text style={styles.tableCell}>Medico:</Text>
              <Text style={styles.tableCell}>Empresa:</Text>
              <Text style={styles.tableCell}>Elaborado:</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{resul.paciente.medico}</Text>
              <Text style={styles.tableCell}>{resul.paciente.empresa}</Text>
              <Text style={styles.tableCell}>{resul.elab}</Text>
            </View>


          </View>
        </View> 


        <View style={styles.body}>
            
              <Text style={styles.sectionTitle}>{}</Text>
              <View style={styles.table}>
                <View style={styles.row}>
                 
                  <Text style={styles.header}>Nombre</Text>
                  <Text style={styles.header}>Valor</Text>
                  <Text style={styles.header}>Desc1</Text>
                </View>
                {resul.detalle.map((examen) => (
                  <View key={examen.seq} style={styles.row}>
                  
                    <Text style={styles.cell}>{examen.nomexamen}</Text>
                    <Text style={styles.cell}>{examen.valor}</Text>
                    <Text style={styles.cell}>{examen.desc1}</Text>
                  </View>
                ))}
              </View>
         
              <View style={styles.table}>
			        <View style={[styles.tableRow]}>
                  <Text style={styles.header}>Subtotal:</Text>
                  <Text style={styles.header}>Bono:</Text>
                  <Text style={styles.header}>CuotaMod:</Text>
                  <Text style={styles.header}>Copago:</Text>
                  <Text style={styles.header}>Descto Auto.:</Text>
                  <Text style={styles.header}>Total:</Text>
                  <Text style={styles.header}>Abono:</Text>
                  <Text style={styles.header}>Saldo:</Text>
              </View>
            
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{resul.subtotal}</Text>
                <Text style={styles.tableCell}>{resul.bono}</Text>
                <Text style={styles.tableCell}>{resul.cuotam}</Text>
                <Text style={styles.tableCell}>{resul.copago}</Text>
                <Text style={styles.tableCell}>{resul.descauto}</Text>
                <Text style={styles.tableCell}>{resul.total}</Text>
                <Text style={styles.tableCell}>{resul.abono}</Text>
                <Text style={styles.tableCell}>{resul.saldo}</Text>
              </View>
            </View>




          <Text>{resul.ordpie}</Text>
          <Text>{resul.ordfir}</Text>
        </View>

      </Page>
    </Document>
  );
};


      // useEffect(() => {
      //   obtenerDatosResultado();
      //  }, []);

// Define component to render PDF viewer



const RepOrden = (props) => {

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();
const [usuario,setUsuario] = useState('FCHARRIS');

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


 const [data, setdata] = useState(""); 

  const generatePdf = async () => {
    try { 
      const urlselect = baseurl + "orden/find/" + props.miage + "/" + props.miord
      const response = await fetch(urlselect); 
      const data =  await response.json(); 
      setdata(data)
      console.log(data);
       
    } catch (error) { 
      console.error(error); 
    } 
  }

  return (
    <div>
        Imprimir orden 
        <button onClick={generatePdf}>Generate PDF</button>
        <button  onClick={() => {props.regresar('ORDEN')}}>Regresar</button>
        {data && (
          <div>
            <PDFViewer width="100%" height="600px">
              <Invoiced resul={data} />
            </PDFViewer>
          </div>
        )}
      </div>
  );
};

export default RepOrden;
