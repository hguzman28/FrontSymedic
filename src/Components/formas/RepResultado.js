import React, { useState, useEffect } from 'react'; 
import { PDFViewer, Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';
//const rutamemb = "../imagenes/" + props.membrete;

import cehoca from "../imagenes/cehoca.png";
import membrete from "../imagenes/membrete.png";
import fracturas from "../imagenes/fracturas.png";
import vistaprevia from "../imagenes/vistaprevia.png";



//import membretedef from "../imagenes/membrete.png";

import pie from "../imagenes/pie.png";

const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 

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
    fontSize: 20,
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
  },
  tableCell: {
    flex: 1,
    padding: 10,
    color: "#333",
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
  },
  cell: {
    flex: 1,
    padding: 10,
    color: "#333",
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#777",
    marginTop: 20,
  },
});



// Define component to render invoice
const Invoiced = ({ resul }) => {


  return (
    <Document>
      <Page style={styles.page}>

      {resul.membrete=="membrete.png" && <Image src={membrete}></Image> }
      {resul.membrete=="cehoca.png" && <Image src={cehoca}></Image> }
      {resul.membrete=="fracturas.png" && <Image src={fracturas}></Image> }
      {resul.membrete=="vistaprevia.png" && <Image src={vistaprevia}></Image> }
      
        {/* <Image src={require(`../imagenes/${resul.membrete}`).default} />   <img src="images/membrete.png" alt="BigCo Inc. logo"/>   */} 
       
             

      <Text>{resul.sedeppal[0].texto}</Text>
      <Text>{resul.sedeppal[1].texto}</Text>
      <Text>{resul.sedeppal[2].texto}</Text>

      <Text style={styles.title}>Orden# {resul.paciente.ordenl}</Text>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.sectionTitle]}>
              <Text style={styles.tableCell}>Fecha de la orden:</Text>
              <Text style={styles.tableCell}>Identificacion:</Text>
              <Text style={styles.tableCell}>Nombre:</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{resul.paciente.fecorden}</Text>
              <Text style={styles.tableCell}>{resul.paciente.codpac}</Text>
              <Text style={styles.tableCell}>{resul.paciente.nombre}</Text>
            </View>
            <View style={[styles.tableRow, styles.sectionTitle]}>
              <Text style={styles.tableCell}>Edad:</Text>
              <Text style={styles.tableCell}>Sexo:</Text>
              <Text style={styles.tableCell}>Agencia:</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{resul.paciente.edad}</Text>
              <Text style={styles.tableCell}>{resul.paciente.sexo}</Text>
              <Text style={styles.tableCell}>{resul.paciente.age}</Text>
            </View>
            <View style={[styles.tableRow, styles.sectionTitle]}>
              <Text style={styles.tableCell}>Tel:</Text>
              <Text style={styles.tableCell}>Empresa:</Text>
              <Text style={styles.tableCell}>Medico:</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{resul.paciente.tel}</Text>
              <Text style={styles.tableCell}>{resul.paciente.empresa}</Text>
              <Text style={styles.tableCell}>{resul.paciente.medico}</Text>
            </View>
          </View>
        </View> 


        <View style={styles.body}>
          {resul.grupo.map((rompe) => (
            <View key={rompe.id} style={styles.group}>
              <Text style={styles.sectionTitle}>{rompe.nomexamen}</Text>
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.header}>Analisis</Text>
                  <Text style={styles.header}>Resultado</Text>
                  <Text style={styles.header}>Val. Normal</Text>
                  <Text style={styles.header}>ResultadoAnt</Text>
                </View>
                {rompe.detalle.map((analisis) => (
                  <View key={analisis.id} style={styles.row}>
                    <Text style={styles.cell}>{analisis.nomanalisis}</Text>
                    <Text style={styles.cell}>{analisis.resultado}</Text>
                    <Text style={styles.cell}>{analisis.valnormal}</Text>
                    <Text style={styles.cell}>{analisis.resant}</Text>
                  </View>
                ))}
              </View>
              <Text>Firmado: {rompe.medfirmad} {"            "}firmado: {rompe.medfirmad2} </Text>
              <Text>{rompe.bolo}</Text>

            </View>
          ))}
          <Text>{resul.respie}</Text>
        </View>

        <Image src={pie}></Image>

      </Page>
    </Document>
  );
};


      // useEffect(() => {
      //   obtenerDatosResultado();
      //  }, []);

// Define component to render PDF viewer
const RepResultado = (props) => {

 // <RepResultado miage={agencia} miord={numorden} milista={incluirExamen} membrete={membrete} usuario ={user}  /> 

 const [data, setdata] = useState(""); 
 const [membretetop, setMembretetop] = useState(''); 
 const [imprimir,setImprimir] = useState(true);

/*
    const response = await fetch( 
       `${baseurl}update/${selectedTipomuestra.tipmues}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
         nombre:selectedTipomuestra.nombre  })  }
  ); 
*/


useEffect(() =>{    

  setMembretetop(props.membrete);

} );

  const generatePdf = async () => {
    try { 
      const urlselect = baseurl + "resultado/find/" + props.miage + "/"+ props.miord
      const response = await fetch(urlselect,
        { method: 'POST', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
         body: JSON.stringify({ 
         incluirexamenes: props.milista, usuario: props.usuario  })  }
         ); 
          const data =  await response.json(); 
          setdata(data)
          console.log(data);
          console.log(' ***** **** ******');
          console.log(' LLamado con parametros ' + props.milista + ' usuario ' + props.usuario);
          console.log(' imprimir ' + data.imprimir);
          console.log(' causal ' + data.causal);
          console.log(' membrete ' + data.membrete);

          if (data.imprimir == "N"){
            //alert(data.causal);
            const texto = data.causal
            setdata({"imprimir":"N","causal":texto});
            setImprimir(false);
          }
        

      //if (data.membrete !== ""){
      //  import membrete from "../imagenes/{data.membrete}";
      //}


    } catch (error) { 
      console.error(error); 
    } 
  }

  return (
    <div  >
        Imprimir orden  ( {props.usuario} )
        <button onClick={generatePdf}>Generate PDF</button>
        {data && imprimir && (
          <div>
            <PDFViewer width="100%" height="600px">
              <Invoiced resul={data} />
            </PDFViewer>
          </div>
        )
        }
        {data && (!imprimir) && (
          <div>
            <PDFViewer width="100%" height="600px">
            <Document>
              <Page style={styles.page}>
               <Text>Impresion no disponible, causal: {data.causal} </Text>
              </Page>
            </Document>  
            </PDFViewer>
          </div>
        )
        }
      </div>
  );
};

export default RepResultado;
