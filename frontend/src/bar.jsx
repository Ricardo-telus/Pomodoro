import React from 'react'
import { Link } from "react-router-dom";
const Bar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Assignment LuisPA</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>          
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/pomodoro">Pomodoro</Link>          
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/masked-input">Masked Input</Link>          
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/json-to-csv">JSON to CSV</Link>          
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/url-shortener">URLShortener</Link>          
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/newsletter-subscribe">Newsletter</Link>          
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Bar