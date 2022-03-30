import React, {useState} from 'react'
import './styles.css'
const Masked = () => {
  const [emergDatos, setEmergDatos]=useState(false)
  const [matches, setMatches]=useState(true)
  const [datos, setDatos]=useState({
    nombre:["", false],
    pApellido:["", false],
    sApellido:["", false],
    nacim:["", false],
    email:["", false],
    direc:["", false],
    codigoM:["", false],
    telef:["", false],
    telefCa:["", false],
    dpi:["", false],
    pasap:["", false],
    tarjeta:["", false],
    vencim:["", false],
    cvc:["", false],
    nombre2:["", false],
    pApellido2:["", false],
    sApellido2:["", false],
    nacim2:["", false],
    email2:["", false],
    direc2:["", false],
    codigoM2:["", false],
    telef2:["", false],
  })
  const forNombre=/^([A-Z][a-zá-ÿ]+([ ]?[A-Z][a-zá-ÿ]+)*)$/;
  const forApellido=/^([A-Z][a-zá-ÿ]*)$/;  
  const forEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const forDirec=/^([a-zA-Zá-ÿ0-9]+([ ]?[.]?[-]?[a-zA-Zá-ÿ0-9]+)*)/
  const forCodigoM=/^[1-9][0-9]{1,3}$/;
  const forTelf= /^([1-9]+[0-9]{3}.*-?([0-9]{4}?))$/;
  const forDpi=/^([0-9]{4}.*?-([0-9]{5}.*?-([0-9]{4}.*)))$/;
  const forPasap=/^([0-9]{4}.*?-([0-9]{5}?))$/;
  const forTarjeta=/\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b$/;
  const forCVC=/^[0-9]{3,4}$/
  const handleChange=(event)=>{
    var respo=false
    switch (event.target.id) {
      case "nombre2":
      case "nombre":
        respo=validarCampos(forNombre, event.target.id, event.target.value)        
        break;
      case "pApellido2":
      case "pApellido":
      case "sApellido2":
      case "sApellido":
        respo=validarCampos(forApellido, event.target.id, event.target.value)
        break;
      case "nacim2":
      case "nacim":
        respo=true
        break;
      case "email2":        
      case "email":
        respo=validarCampos(forEmail, event.target.id, event.target.value)
        break;
      case "direc2":
      case "direc":
        respo=validarCampos(forDirec, event.target.id, event.target.value)
        break;
      case "codigoM2":
      case "codigoM":
        respo=validarCampos(forCodigoM, event.target.id, event.target.value)
        break;
      case "telef2":
      case "telef":
        respo= validarCampos(forTelf, event.target.id, event.target.value)
        break;
      case "telefCa":
        respo= validarCampos(forTelf, event.target.id, event.target.value)
        break;
      case "dpi":
        respo= validarCampos(forDpi, event.target.id, event.target.value)
        break;
      case "pasap":
        respo= validarCampos(forPasap, event.target.id, event.target.value)
        break;
      case "tarjeta":
        respo=validarCampos(forTarjeta, event.target.id, event.target.value)
        break;
      case "vencim":
        respo= true
        break;
      case "cvc":
        respo= validarCampos(forCVC, event.target.id, event.target.value)                       
        break;
      default:
        console.log("id desconocido")
        break;
    }
    setDatos({
      ...datos,
      [event.target.id] : [event.target.value, respo]
  })
  }
  const validarCampos=(expresion, input, data)=>{
    if (expresion.test(data)) {
      document.getElementById(input).style.borderColor="green"
      return true
    } else {      
      document.getElementById(input).style.borderColor="red"      
      return false      
    }
  }
  const handleSubmit=(event)=>{   
   event.preventDefault()
   var status=true
   Object.entries(datos).forEach((element)=>{     
      if (emergDatos) {
          if (!element[1][1]) {
            status=false
            console.log(status)
          }
      } else{   
        if (!element[0].includes('2')) {
          if (!element[1][1]) {
            status=false
            console.log(status)
          }          
        }     
      }   
    })  
    console.log(datos)
    if (status) {
      window.localStorage.setItem(datos.email[0],JSON.stringify(datos))
      alert("guardados")
      setDatos({
        nombre:["", false],
        pApellido:["", false],
        sApellido:["", false],
        nacim:["", false],
        email:["", false],
        direc:["", false],
        codigoM:["", false],
        telef:["", false],
        telefCa:["", false],
        dpi:["", false],
        pasap:["", false],
        tarjeta:["", false],
        vencim:["", false],
        cvc:["", false],
        nombre2:["", false],
        pApellido2:["", false],
        sApellido2:["", false],
        nacim2:["", false],
        email2:["", false],
        direc2:["", false],
        codigoM2:["", false],
        telef2:["", false],
      })
    } else {    
      alert('Algun campo no es valido o no lo ha ingrasado, por favor verificarlos')      
    }   
  }
  return (
    <form onSubmit={handleSubmit} className="h-100" id='formm'>
    <div className='row pt-3 ' style={{
      backgroundImage: "backgroundImage: linearGradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    }}>
      <div className='col-10 offset-1 col-md-10 mb-3 px-4' id="assignment">
        <center><h3>Ingrese sus datos:</h3></center>
          <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Nombres</label>
                <input type="text" value={datos.nombre[0]} onChange={handleChange} placeholder="Por ejemplo: Diego Alejandro" className="form-control align-self-center p-2" id="nombre"/>
              </div>              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Primer apellido</label>
                <input type="text" value={datos.pApellido[0]} onChange={handleChange} placeholder="Por ejemplo: Santos" className="form-control align-self-center p-2" id="pApellido"/>
              </div>
          </div>
          <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Segundo apellido</label>
                <input type="text" value={datos.sApellido[0]} onChange={handleChange} placeholder="Por ejemplo: Ruiz" className="form-control align-self-center p-2" id="sApellido"/>                
              </div>              
              <div className="col-12 col-md-6 d-flex">
                <label  className="col-3 form-label align-self-center">Fecha de nacimiento</label>
                <input type="date" value={datos.nacim[0]} onChange={handleChange} className="form-control align-self-center p-2" id="nacim"/>
              </div>
          </div>
          <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label  className="col-3 form-label align-self-center">Email</label>
                <input type="text" value={datos.email[0]} onChange={handleChange} placeholder="Por ejemplo: micorreo@hotmail.com..." className="form-control align-self-center p-2" id="email"/>
              </div>              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Dirección</label>
                <input type="text" value={datos.direc[0]} onChange={handleChange} placeholder="Por ejemplo: Casa 21 zona 1 ciudad de guatemala" className="form-control align-self-center p-2" id="direc"/>
              </div>
          </div>
          <div className="mb-3 mt-3 row d-md-flex">              
              <div className="col-12 col-md-4 d-flex">
                <label className="col-4 form-label align-self-center">Código de marcado</label>
                <input type="text" value={datos.codigoM[0]} onChange={handleChange} placeholder="Por ejemplo: 502, 501...." className="form-control align-self-center p-2" id="codigoM"/>
              </div>
              <div className="col-12 col-md-4 d-flex">
                <label className="col-4 form-label align-self-center">Número Telefono</label>
                <input type="text" value={datos.telef[0]} onChange={handleChange} placeholder="Por ejemplo: 56124578, 5245-8935" className="form-control align-self-center p-2" id="telef"/>           
              </div>
              <div className="col-12 col-md-4 d-flex">
                <label className="col-4 form-label align-self-center">Telefono de casa</label>
                <input type="text" value={datos.telefCa[0]} onChange={handleChange} placeholder="Por ejemplo: 26124578, 2245-8935" className="form-control align-self-center p-2" id="telefCa"/>
              </div>
          </div>
          <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-4 form-label align-self-center">Número identificacion de usted de su país</label>
                <input type="text" value={datos.dpi[0]} onChange={handleChange} placeholder="Por ejemplo: 9845-95681-0101" className="form-control align-self-center p-2" id="dpi"/>
              </div>              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Número pasaporte</label>
                <input type="text" value={datos.pasap[0]} onChange={handleChange} placeholder="Por ejemplo: 5615-95465" className="form-control align-self-center p-2" id="pasap"/>
              </div>
          </div>
          <div className="mb-3 mt-3 row">              
            <div className="col-12 col-md-4 d-flex">
                <label className="col-4 form-label align-self-center">Número de tarjeta de crédito</label>
                <input type="text" value={datos.tarjeta[0]} onChange={handleChange} placeholder="Ejem. 1234-1234-1234-1234" className="form-control align-self-center p-2" id="tarjeta"/>
            </div>
            <div className="col-12 col-md-4 d-flex">
                <label className="col-4 form-label align-self-center">Fecha de vencimiento</label>
                <input type="month" value={datos.vencim[0]} min="2020-01" onChange={handleChange} className="form-control align-self-center p-2" id="vencim"/>
            </div>
            <div className="col-12 col-md-4 d-flex">
                <label className="col-3 form-label align-self-center">Código CVC</label>
                <input type="text" value={datos.cvc[0]} onChange={handleChange} placeholder="Por ejemplo: 999, 012, 1453...." className="form-control align-self-center p-2" id="cvc"/>
              </div>
          </div>    
          <center>
            <div className="col-5 col-md-3 form-check form-switch mb-3">
              <input 
              className="form-check-input" 
              type="checkbox" 
              role="switch" 
              value={emergDatos}
              onChange={()=>setEmergDatos(!emergDatos)}
              id="flexSwitchCheckDefault"/>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">¿Datos de emergencia? (opcional)</label>
            </div>
          </center>   
      </div>    
      <div className='col-10 offset-1 my-2' hidden={!emergDatos}>
          <div className='py-3 px-4' id="assignment">
         <center><h3>Datos de emergencia</h3><h4>(opcional)</h4></center>
         <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Nombres</label>
                <input type="text" value={datos.nombre2[0]} onChange={handleChange} placeholder="Por ejemplo: Diego Alejandro" className="form-control align-self-center p-2" id="nombre2"/>
              </div>              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Primer apellido</label>
                <input type="text" value={datos.pApellido2[0]} onChange={handleChange} placeholder="Por ejemplo: Santos" className="form-control align-self-center p-2" id="pApellido2"/>
              </div>
        </div>
        <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Segundo apellido</label>
                <input type="text" value={datos.sApellido2[0]} onChange={handleChange} placeholder="Por ejemplo: Ruiz" className="form-control align-self-center p-2" id="sApellido2"/>
              </div>              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Fecha de nacimiento</label>
                <input type="date" value={datos.nacim2[0]} onChange={handleChange} className="form-control align-self-center p-2" id="nacim2"/>
              </div>
        </div>
        <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Email</label>
                <input type="text" value={datos.email2[0]} onChange={handleChange} placeholder="Por ejemplo: micorreo@hotmail.com..." className="form-control align-self-center p-2" id="email2"/>
              </div>              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Dirección</label>
                <input type="text" value={datos.direc2[0]} onChange={handleChange} placeholder="Por ejemplo: Casa 21 zona 1 ciudad de guatemala" className="form-control align-self-center p-2" id="direc2"/>
              </div>
        </div>
        <div className="mb-3 mt-3 row">              
              <div className="col-12 col-md-6 d-flex">
                <label className="col-3 form-label align-self-center">Código de marcado</label>
                <input type="text" value={datos.codigoM2[0]} onChange={handleChange} placeholder="Por ejemplo: 502, 501...." className="form-control align-self-center p-2" id="codigoM2"/>                
              </div>              
              <div className="col-12 col-md-6 d-flex">
              <label className="col-3 form-label align-self-center">Número Telefono</label>
                <input type="text" value={datos.telef2[0]} onChange={handleChange} placeholder="Por ejemplo: 56124578, 5245-8935" className="form-control align-self-center p-2" id="telef2"/>                
              </div>
        </div>
      </div>            
      </div>    
      <div className='col-10 offset-1 py-3 px-3 my-3' id="assignment">
              <center>
                <button
                value="submit"
                className='btn btn-success'
                >Enviar datos
                </button>
              </center>
            </div>
    </div>
    </form>
  )
}

export default Masked
//la que sigue pendiente de verificar por que no jala    https://regexr.com/6i4rh
  //const forEmail=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;