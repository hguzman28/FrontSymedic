# version 1.0
# Genere un crud con campos basicos, servicios consumidos con axios
# pero no maneja hooks sino arreglos para guardar los estados

servicio="http://127.0.0.1:8000/"
clase="Lablistas"
tabla="lablistas"
objeto="lablista" # Mismo nombre de la tabla pero en singular
llave="codlista"
campos = [
          {'nombre':'codlista', 'tipo':'caracter', 'llave':'S', 'control':'text'},
          {'nombre':'nombre', 'tipo':'caracter', 'llave':'N' , 'control':'text'},
          {'nombre':'pais', 'tipo':'caracter', 'llave':'N', 'control':'combo'},
          {'nombre':'capital_bursatil', 'tipo':'numero','llave':'N', 'control':'text'},
          ]

tam = len(campos)

#print ("longitud " + str(num_campos))

# construir cadena de inicializacion de campos
cad_init = ''
cad_select = ''
cad_th =''
cad_td = ''
cad_html = ''
cont = 0
for campo in campos:
  #init
  reg = campo['nombre'] + ":''" + (',' if cont < tam-1 else '') + "\n"
  cad_init = cad_init + reg
  #select
  reg = campo['nombre'] + ":" + objeto +"." + campo['nombre'] + (',' if cont < tam-1 else '') + "\n"
  cad_select = cad_select + reg
  #th
  reg = "<th>" + campo['nombre'] + "</th> \n"
  cad_th = cad_th + reg
  #td
  reg = "<td>" + "{" + objeto + "." + campo['nombre'] + "} </td> \n"
  cad_td = cad_td + reg
  #html
  if campo['nombre'].lower() == llave.lower():
    reg = "<label htmlFor='"+ llave +"'>"+ llave +"</label> \n"
    reg = reg + "{this.state.tipoModal==='insertar'? <input className='form-control'  type='text' name='"+llave+"' "
    reg = reg + " id='"+llave+"'  onChange=  {this.handleChange} value={form?form."+llave+": ''}/>:<input className='form-control' "         
    reg = reg + " type='text' disabled name='"+llave+"' id='"+llave+"' onChange={this.handleChange} value={form?form."+llave+": ''}/> }"
  else: 
    reg = "<br/> <label htmlFor='"+campo['nombre']+"'>"+campo['nombre']+"</label>  <input className='form-control' type='text' name='"+campo['nombre']+"' id='"+campo['nombre']+"' onChange={this.handleChange} value={form?form."+campo['nombre']+": ''}/> \n"
  
  cad_html = cad_html + reg
  cont = cont +1

lit1 = "import React, { Component } from 'react';import axios from 'axios'; \n" 
lit2 = "import 'bootstrap/dist/css/bootstrap.min.css'; \n" 
lit3 = "import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; \n"
lit4 = "import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; \n"
lit4a = "import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'; \n"   

lit5 = " const url='" + servicio + tabla + "/" + "'; \n"

lit5a = "const urlselect = url+'select'; \n"

lit6 = "class Empresas extends Component { state={data:[], modalInsertar: false, \n"
lit7 = "  modalEliminar: false, form:{" + cad_init 
lit8 = " }, } \n"

lit9 = "peticionGet=()=>{ axios.get(urlselect).then(response=>{ "
lit10 = " this.setState({data: response.data.data}); }).catch(error=>{ console.log(error.message); }) } \n"

lit11 = "peticionPost=async()=>{ "
lit12 = "await axios.post(url+'insert',this.state.form).then(response=>{ "
lit13 = "this.modalInsertar(); this.peticionGet(); }).catch(error=>{ console.log(error.message); }) } \n"

lit14 = "peticionPut=()=>{axios.put(url+'update/'+this.state.form."+llave+", this.state.form).then(response=>{"
lit15 = " this.modalInsertar(); this.peticionGet(); }) } \n"

lit16 = "peticionDelete=()=>{ "
lit17 = "axios.delete(url+'delete/'+this.state.form."+llave+").then(response=>{ "
lit18 = "this.setState({modalEliminar: false}); this.peticionGet();   }) }  \n"

lit19 = "modalInsertar=()=>{ this.setState({modalInsertar: !this.state.modalInsertar}); } \n"
lit20 =  "seleccionarempresa=("+objeto+")=>{this.setState({ tipoModal: 'actualizar', form: { " + cad_select + "\n"
lit21 =  " }   }) } \n"

lit22 = "handleChange=async e=>{e.persist(); await this.setState({ \n"
lit23 = " form:{ ...this.state.form, [e.target.name]: e.target.value }}); console.log(this.state.form); } \n"
lit24 = " componentDidMount() { this.peticionGet(); } \n"

lit25 = " render(){ const {form}=this.state; return ( <div className='App'> <br /><br /><br /> \n"
lit26 = " <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); \n" 
lit27 = " this.modalInsertar()}}>Agregar "+tabla+"</button> \n"
lit28 = " <br /><br /> \n <table className='table'>  \n <thead> <tr>" + cad_th + "\n"
lit29 = "  </tr> </thead> \n <tbody> {this.state.data.map("+objeto+"=>{ return( <tr>" + cad_td + "\n" 
lit30 = " <td> <button className='btn btn-primary' onClick={()=>{this.seleccionar"+objeto+"("+objeto+"); \n" 
lit31 = " this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button> {'   '} \n"
lit32 = " <button className='btn btn-danger' onClick={()=>{this.seleccionar"+objeto+"("+objeto+"); \n" 
lit33 = "this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button> \n"
lit34 = " </td> </tr> ) })} </tbody> </table> \n"
lit35 = "    <Modal isOpen={this.state.modalInsertar}><ModalHeader style={{display: 'block'}}> \n"
lit36 = "    <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span> \n "
lit37 = "</ModalHeader> \n <ModalBody> \n <div className='form-group'> \n" + cad_html 
lit38 = " </div> \n </ModalBody> \n"
lit39 = "<ModalFooter> {this.state.tipoModal==='insertar'? \n"
lit40 = " <button className='btn btn-success' onClick={()=>this.peticionPost()}> \n"
lit41 = "     Insertar </button>: <button className='btn btn-primary' onClick={()=>this.peticionPut()}> \n"
lit42 = "     Actualizar </button> } \n"
lit43 = "  <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>Cancelar</button> \n"
lit44 = "  </ModalFooter> </Modal> \n"
lit45 = "  <Modal isOpen={this.state.modalEliminar}> <ModalBody> \n"
lit46 = "   Estás seguro que deseas eliminar a la "+tabla+" {form && form.nombre} \n"
lit47 = "   </ModalBody> <ModalFooter> \n"
lit48 = "  <button className='btn btn-danger' onClick={()=>this.peticionDelete()}>Sí</button> \n"
lit49 = "  <button className='btn btn-secundary' onClick={()=>this.setState({modalEliminar: false})}>No</button> \n"
lit50 = "    </ModalFooter> \n </Modal> \n </div> \n ); } } \n export default "+clase+"; "

print(lit1+lit2+lit3+lit4+lit4a+lit5+lit5a)
print(lit6+lit7+lit8+lit9+lit10)
print(lit11+lit12+lit13+lit14)
print(lit15+lit16+lit17+lit18+lit19+lit20)
print(lit21+lit22+lit23+lit24+lit25)
print(lit26+lit27+lit28+lit29+lit30)
print(lit31+lit32+lit33+lit34+lit35)
print(lit36+lit37+lit38+lit39+lit40)
print(lit41+lit42+lit43+lit44+lit45)
print(lit46+lit47+lit48+lit49+lit50)

