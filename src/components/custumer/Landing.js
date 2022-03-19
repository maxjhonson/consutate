import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <div className="landing-img">
        <img className="ui massive fluid image" src="./landing-photo.png"></img>
      </div>
      <div className="landing-content">
        <h1 className="ui header">¡Aumenta tus posiblidades de viaje!</h1>
        <h3 className="ui header">
          Responde las preguntas y obtén recomendaciones personalizadas para tu proxima
          cita
        </h3>
        <Link to="/questionnaire" className="landing-content-button">
          Continuar
        </Link>
        <div style={{ fontWeight: "400", fontSize: "10px", marginTop: "20px" }}>
          Al continuar estás de acuerdo y aceptas nuestros terminos y condiciones
          <Link
            target="_blank"
            style={{ display: "block", textDecoration: "none" }}
            to="/terms"
          >
            Terminos y condiciones
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
