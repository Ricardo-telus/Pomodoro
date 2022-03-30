import React, {useState} from 'react'
import './styles.css'
const Masked = () => {
  const [emeergDatos, setEmergDatos]=useState(false)
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
    nombre2:["", true],
    pApellido2:["", true],
    sApellido2:["", true],
    nacim2:["", true],
    email2:["", true],
    direc2:["", true],
    codigoM2:["", true],
    telef2:["", true],
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
    console.log(event.target.id)
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
    console.log(expresion.test(data))
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
   Object.entries(datos).forEach((element)=>{
     if (!element[1][1]) {
       setMatches(false)
      console.log(element[1][1])
     }
    })   
    if (matches) {
      window.localStorage.setItem(datos.email[0],JSON.stringify(datos))
    } else {
      setMatches(true)
      alert('Algun campo no es valido o no lo ha ingrasado, por favor verificarlos')
    }   
    console.log(datos)
    console.log(matches)
  }
  return (
    <form onSubmit={handleSubmit} className="h-100" id='formm'>
    <div className='row pt-3 ' style={{
      backgroundImage: "backgroundImage: linearGradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    }}>
      <div className='col-10 offset-1 col-md-5 mb-3' id="assignment">
        <center><h3>Ingrese sus datos:</h3></center>
          <div className="mb-3 mt-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label is-Valid">Nombres</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: Diego Alejandro" className="form-control align-self-center p-2" id="nombre"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Primer apellido</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: Santos" className="form-control align-self-center p-2" id="pApellido"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Segundo apellido</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: Ruiz" className="form-control align-self-center p-2" id="sApellido"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Fecha de nacimiento</label>
              <div className="col-sm-9 d-flex">
                <input type="date" onChange={handleChange} className="form-control align-self-center p-2" id="nacim"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: micorreo@hotmail.com..." className="form-control align-self-center p-2" id="email"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Dirección</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: Casa 21 zona 1 ciudad de guatemala" className="form-control align-self-center p-2" id="direc"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Código de marcado</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: 502, 501...." className="form-control align-self-center p-2" id="codigoM"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número Telefono</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: 56124578, 5245-8935" className="form-control align-self-center p-2" id="telef"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Telefono de casa</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: 26124578, 2245-8935" className="form-control align-self-center p-2" id="telefCa"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número identificacion de usted de su país</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: 9845-95681-0101" className="form-control align-self-center p-2" id="dpi"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número pasaporte</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo: 5615-95465" className="form-control align-self-center p-2" id="pasap"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número de tarjeta de crédito</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo:" className="form-control align-self-center p-2" id="tarjeta"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Fecha de vencimiento</label>
              <div className="col-sm-9 d-flex">
                <input type="month" min="2020-01" onChange={handleChange} className="form-control align-self-center p-2" id="vencim"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Código CVC</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} placeholder="Por ejemplo:" className="form-control align-self-center p-2" id="cvc"/>
              </div>
          </div>
        </div>
        <div className='col-10 col-md-4 offset-1'>
          <div className='py-3 px-3' id="assignment">
         <center><h3>Datos de emergencia</h3><h4>(opcional)</h4></center>
            <div className="mb-3 mt-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Nombres</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} placeholder="Por ejemplo: Diego Alejandro" className="form-control align-self-center p-2" id="nombre2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Primer apellido</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} placeholder="Por ejemplo: Santos" className="form-control align-self-center p-2" id="pApellido2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Segundo apellido</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} placeholder="Por ejemplo: Ruiz" className="form-control align-self-center p-2" id="sApellido2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Fecha de nacimiento</label>
                  <div className="col-sm-9 d-flex">
                    <input type="date" onChange={handleChange} className="form-control align-self-center p-2" id="nacim2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} placeholder="Por ejemplo: micorreo@hotmail.com..." className="form-control align-self-center p-2" id="email2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Dirección</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} placeholder="Por ejemplo: Casa 21 zona 1 ciudad de guatemala" className="form-control align-self-center p-2" id="direc2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Código de marcado</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} placeholder="Por ejemplo: 502, 501...." className="form-control align-self-center p-2" id="codigoM2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número Telefono</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} placeholder="Por ejemplo: 56124578, 5245-8935" className="form-control align-self-center p-2" id="telef2"/>
                  </div>
              </div>
            </div>
            <div className='col-12 py-3 px-3 my-3' id="assignment">
              <center>
                <button
                value="submit"
                className='btn btn-success'
                >Enviar datos
                </button>
              </center>
            </div>
      </div>
    </div>
    </form>
  )
}

export default Masked
//la que sigue pendiente de verificar por que no jala    https://regexr.com/6i4rh
  //const forEmail=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;