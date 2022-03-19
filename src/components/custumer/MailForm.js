import React from "react";
import { Form, Field } from "react-final-form";
import { InputWithValidation } from "../Global/CustomInputs";
import validator from "validator";

function MailForm(props) {
  const onSubmit = () => {};

  return (
    <div className="half-container-parent ui form">
      <Form
        onSubmit={onSubmit}
        validate={validation}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="ui form">
            <div className="half-container">
              <h1 class="ui header mb-5">
                Ingresa tu correo electrónico
                <span style={{ color: "#5BBFBA" }}>para continuar al siguiente paso</span>
              </h1>
              <Field
                name="email"
                render={(props) => InputWithValidation(props, "Correo Electronico")}
              />
              <Field
                name="confirmEmail"
                render={(props) =>
                  InputWithValidation(props, "Confirmar Correo Electronico")
                }
              />
              <button className="landing-content-button">Continuar</button>
            </div>
          </form>
        )}
      ></Form>
    </div>
  );
}

const validation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Este campo es requerido";
  }
  if (values.email && !validator.isEmail(values.email ?? "")) {
    errors.email = "Favor agregar un email valido";
  }
  if (values.confirmEmail !== values.email) {
    errors.confirmEmail = "El correo debe coincidir";
  }

  return errors;
};
export default MailForm;
