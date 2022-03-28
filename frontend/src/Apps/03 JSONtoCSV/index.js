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
    var formatear=JSON.parse(info)
    setInfo(JSON.stringify(formatear, undefined, 4))
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
  const convertToCsv=(estructure)=>{
  let filas = (estructure);
    let titulos = "";
    Object.keys(filas[0]).map(pr => (titulos += pr + ";"));
    let str = "";
    filas.forEach(fila => {
      let linea = "";
      let columnas =
        typeof fila !== "object" ? JSON.parse(fila) : Object.values(fila);
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
          <button type="button" className="btn btn-info mx-1">1</button>
          <button type="button" className="btn btn-info mx-1">3</button>
          <button type="button" className="btn btn-info mx-1">2</button>
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
} */