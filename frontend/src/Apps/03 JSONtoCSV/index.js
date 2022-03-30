import React, { useState } from "react";
import "./styles.css";

function JSONtoCSVApp() {
  const [info, setInfo]=useState([])
  const [result, setResult]=useState([])
  const reset=()=>{
    setInfo([])
    setResult([])
  }
  const formatearJson=()=>{
    if (String(info)!==String([])) {
      var formatear=JSON.parse(info)
      setInfo(JSON.stringify(formatear, undefined, 4))       
    } else {
      alert("No hay datos que formatear....")      
    }    
  }
  const agregarEjemplos= async (e)=>{
    setResult([])
    switch (parseInt(e.target.value)) {
      case 1:
      setInfo(JSON.stringify([
        {
          "id":1,    "name":"Johnson, Smith, and Jones Co.",
          "amount":345.33,    "Remark":"Pays on time"
        },
        {
          "id":2,    "name":"Sam \"Mad Dog\" Smith",
          "amount":993.44,    "Remark":""
        },
        {
          "id":3,    "name":"Barney & Company",
          "amount":0,    "Remark":"Great to work with\nand always pays with cash."
        },
        {
          "id":4,    "name":"Johnson's Automotive",
          "amount":2344,    "Remark":""
        }
      ]), undefined, 4)
        break;
      case 2:
        setInfo(JSON.stringify({ "data" : [
          {    "id":1,    "name":"Johnson, Smith, and Jones Co."  },
          {    "id":2,    "name":"Sam \"Mad Dog\" Smith"  },
          {    "id":3,    "name":"Barney & Company"  },
          {    "id":4,    "name":"Johnson's Automotive"  }
        ] }
        ), undefined, 4)
        break;
      case 3:
        setInfo(JSON.stringify({ "race" : 
        { "entries" : [
         {    "id":11,    "name":"Johnson, Smith, and Jones Co."  },
         {    "id":22,    "name":"Sam \"Mad Dog\" Smith"  },
         {    "id":33,    "name":"Barney & Company"  },
         {    "id":44,    "name":"Johnson's Automotive"  }
       ] }
       }), undefined, 4)
        break;
      default:
        break;
    }
  }
  const buscar=(dato)=>{
    if (String(info)===String([])) {
      alert("No hay datos que convertir")
      return
    }
    let rows = typeof objArray !== "object" ? JSON.parse(dato) : dato;
      for (const [key, value] of Object.entries(rows)) {  
      if (Object.keys(value).length>1) {
        if (value.length===undefined) {
          convertToCsv(rows)
        } else {
          convertToCsv(value)
        }
        return
      } else {
        if (Object.keys(value).length===0) {
          var objtemp=[]
          objtemp.push(rows)
          convertToCsv(objtemp)
          return
        } else {
          buscar(JSON.stringify(value)) 
        }        
      }      
    } 
  }
  const convertToCsv=(estructure)=>{
  let filas = (estructure);
    let titulos = "";
    Object.keys(filas[0]).map(pr => (titulos += pr + ";"));
    let str = "";
    filas.forEach(fila => {
      let linea = "";
      let columnas = typeof fila !== "object" ? JSON.parse(fila) : Object.values(fila);
      columnas.forEach(columna => {
        if (linea !== "") {
          linea += ";";
        }
        if (typeof columna === "object") {
          linea += JSON.stringify(columna);
        } else {
          linea += columna;
        }
      }); 
      str += linea + "\r\n";
    });
    setResult(result => result.concat(titulos + "\r\n" + str))
    //console.log(titulos + "\r\n" + str)
}
  return (
    <div id="csv">
      <div className="row">
        <h1 className="col-12 pt-3 mx-5">JSON a CSV</h1>
      </div>
      <div className="row mx-5">
        <div className="col-12">
          <h5>Agrega tu JSON a convertir</h5>
          <textarea 
          className="form-control" 
          id="exampleFormControlTextarea1" 
          rows="10"
          value={info}
          onChange={e=>setInfo(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="row d-flex flex-row mx-5 mt-3">
        <div className="col-12">
          <button type="button" className="btn btn-success mt-1 mx-1" onClick={()=>buscar(info)}>Convertir</button>
          <button type="button" className="btn btn-primary mt-1 mx-1" onClick={formatearJson}>Formatear JSON</button>
          <button type="button" className="btn btn-primary mt-1 mx-1" onClick={reset}>Limpiar campos</button>
        </div>
        <div className="col-12 d-flex flex-row mt-3">
          <h5 className="mt-3 me-3">Ejemplos:</h5>
          <button type="button" value={1} className="btn btn-info mx-1" onClick={agregarEjemplos}>1</button>
          <button type="button" value={2} className="btn btn-info mx-1" onClick={agregarEjemplos}>2</button>
          <button type="button" value={3} className="btn btn-info mx-1" onClick={agregarEjemplos}>3</button>
        </div>
        </div>
      <div className="row mx-5 mt-3">
        <div className="col-12 mb-5">
          <h5>Tu resultado:</h5>
          <textarea 
          className="form-control" 
          id="exampleFormControlTextarea1" 
          rows="10"
          value={result}
          onChange={e=>setResult(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default JSONtoCSVApp;



/* const convertToCsv=()=>{
  let rows = JSON.parse(info);
    let header = "";
    Object.keys(rows[0]).map(pr => (header += pr + ";"));
    let str = "";
    rows.forEach(row => {
      let line = "";
      let columns =
        typeof row !== "object" ? JSON.parse(row) : Object.values(row);
      columns.forEach(column => {
        if (line !== "") {
          line += ";";
        }
        if (typeof column === "object") {
          line += JSON.stringify(column);
        } else {
          line += column;
        }
      });
      str += line + "\r\n";
    });
    setResult(header + "\r\n" + str)
} 


const buscar=(dato)=>{
    let rows = typeof objArray !== "object" ? JSON.parse(dato) : dato;
      for (const [key, value] of Object.entries(rows)) {  
        console.log(Object.keys(value).length)     
      if (Object.keys(value).length>1) {
        console.log("1-"+Object.keys(value).length)
        console.log(value)
        console.log(value.length)
        console.log(rows)
        console.log(rows.length)
        if (value.length===undefined) {
          convertToCsv(rows)
        } else {
          convertToCsv(value)
        }
        return
      } else {
        if (Object.keys(value).length===0) {
          var objtemp=[]
          objtemp.push(rows)
          convertToCsv(objtemp)
        } else {
          console.log("2")
          buscar(JSON.stringify(value)) 
        }        
      }      
    } 
  }
*/