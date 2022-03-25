import React, {useState} from 'react'
import './styles.css'
const Masked = () => {
  const [datos, setDatos]=useState({
    nombre:"",
    pApellido:"",
    sApellido:"",
    nacim:"",
    email:"",
    direc:"",
    codigoM:"",
    telef:"",
    telefCa:"",
    dpi:"",
    pasap:"",
    tarjeta:"",
    vencim:"",
    cvc:"",
    nombre2:"",
    pApellido2:"",
    sApellido2:"",
    nacim2:"",
    email2:"",
    direc2:"",
    codigoM2:"",
    telef2:""
  })
  const forNombre=/^([A-Z][a-zá-ÿ]+([ ]?[A-Z][a-zá-ÿ]+)*)$/;
  const forApellido=/^([A-Z][a-zá-ÿ]*)$/;
  //la que sigue pendiente de verificar por que no jala    https://regexr.com/6i4rh
  const forEmail=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const forCodigoM=/^[1-9][0-9]{1,3}$/;
  const forTelf= /^([1-9]+[0-9]{3}.*?-([0-9]{4}?))$/;
  const forDpi=/^([0-9]{4}.*?-([0-9]{5}.*?-([0-9]{4}.*)))$/;
  const forPasap=/^([0-9]{4}.*?-([0-9]{5}?))$/;
  const forTarjeta=/(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/;
  const forVencim=/^(0[1-9]|1[0-2])[\/](19|20)\d{2}$/
  const forCVC=/^[0-9]{3,4}$/


  const handleChange=(event)=>{
    console.log(event.target.id)
    switch (event.target.id) {
      case "nombre2":
      case "nombre":
        validarCampos(forNombre, event.target.id, event.target.value)        
        break;
      case "pApellido2":
      case "pApellido":
      case "sApellido2":
      case "sApellido":
        validarCampos(forApellido, event.target.id, event.target.value)
        break;
      case "nacim2":
      case "nacim":
        break;
      case "email2":        
      case "email":
        validarCampos(forEmail, event.target.id, event.target.value)
        break;
      case "direc2":
      case "direc":
        break;////////////////////
      case "codigoM2":
      case "codigoM":
        validarCampos(forCodigoM, event.target.id, event.target.value)
        break;
      case "telef2":
      case "telef":
        validarCampos(forTelf, event.target.id, event.target.value)
        break;
      case "telefCa":
        validarCampos(forTelf, event.target.id, event.target.value)
        break;
      case "dpi":
        validarCampos(forDpi, event.target.id, event.target.value)
        break;
      case "pasap":
        validarCampos(forPasap, event.target.id, event.target.value)
        break;
      case "tarjeta":
        validarCampos(forTarjeta, event.target.id, event.target.value)
        break;
      case "vencim":
        validarCampos(forVencim, event.target.id, event.target.value)
        break;
      case "cvc":
        validarCampos(forCVC, event.target.id, event.target.value)                       
        break;
      default:
        console.log("id desconocido")
        break;
    }
    setDatos({
      ...datos,
      [event.target.id] : event.target.value
  })
  }
  const validarCampos=(expresion, input, data)=>{
    if (expresion.test(data)) {
      document.getElementById(input).style.borderColor="green"
    } else {
      document.getElementById(input).style.borderColor="red"
    }
  }
  const handleSubmit=(event)=>{
    event.preventDefault()
    console.log(datos)
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className='row pt-3 ' style={{
      backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    }}>
      <div className='col-10 offset-1 col-md-5 mb-3' id="assignment">
        <center><h3>Ingrese sus datos:</h3></center>
          <div className="mb-3 mt-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label is-Valid">Nombres</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="nombre"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Primer apellido</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="pApellido"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Segundo apellido</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="sApellido"/>
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
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="email"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Dirección</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="direc"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Código de marcado</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="codigoM"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número Telefono</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="telef"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número de casa</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="telefCa"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número identificacion de su país</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="dpi"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número pasaporte</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="pasap"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número de tarjeta de crédito</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="tarjeta"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Fecha de vencimiento</label>
              <div className="col-sm-9 d-flex">
                <input type="month" min="2020-01" value="2022-01" onChange={handleChange} className="form-control align-self-center p-2" id="vencim"/>
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Código CVC</label>
              <div className="col-sm-9 d-flex">
                <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="cvc"/>
              </div>
          </div>
        </div>
        <div className='col-10 col-md-4 offset-1'>
          <div className='py-3 px-3' id="assignment">
         <center><h3>Datos de emergencia</h3><h4>(opcional)</h4></center>
            <div className="mb-3 mt-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Nombres</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="nombre2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Primer apellido</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="pApellido2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Segundo apellido</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="sApellido2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Fecha de nacimiento</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="nacim2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="email2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Dirección</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="direc2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Código de marcado</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="codigoM2"/>
                  </div>
              </div>
              <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Número Telefono</label>
                  <div className="col-sm-9 d-flex">
                    <input type="text" onChange={handleChange} className="form-control align-self-center p-2" id="telef2"/>
                  </div>
              </div>
            </div>
            <div className='col-12 py-3 px-3 mt-3' id="assignment">
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


  
  /* const [nombre, setNombre]=useState("") ([a-zA-ZÀ-ÿ\u00f1\u00d1])+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)
  const [pApellido, setPapellido]=useState("") ([a-zA-ZÀ-ÿ\u00f1\u00d1]{3,25})
  const [sApellido, setSapellido]=useState("") ([a-zA-ZÀ-ÿ\u00f1\u00d1]{3,25})
  const [nacim, setNacim]=useState("")
  const [email, setEmail]=useState("")
  const [direc, setDirec]=useState("")
  const [codigoM, setCodigoM]=useState("")
  const [telef, setTelef]=useState("")
  const [telefCa, setTelefCa]=useState("")
  const [dpi, setDpi]=useState("")
  const [pasap, setPasap]=useState("")
  const [tarjeta, setTarjeta]=useState("")
  const [vencim, setVencim]=useState("")
  const [cvc, setCvc]=useState("")
  const [nombre2, setNobre2]=useState("")
  const [pApellido2, setPapellido2]=useState("")
  const [sApellido2, setSapellido2]=useState("")
  const [nacim2, setNacim2]=useState("")
  const [email2, setemail2]=useState("")
  const [direc2, setDirec2]=useState("")
  const [codigoM2, setCodigoM2]=useState("")
  const [telef2, setTelef2]=useState("") */