import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import "./RegisterForm.scss";

export default function RegisterForm({ setShowLogin }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: null,
    onSubmit: (formValue) => {
      console.log(formValue);
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Registrate para ver fotos y videos de tus amigos.
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Nombre y apellidos"
          name="name"
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Correo electronico"
          name="email"
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          placeholder="Contraseña"
          name="password"
        />
        <Form.Input
          type="password"
          placeholder="Repetir contraseña"
          name="repeatPassword"
          onChange={formik.handleChange}
        />

        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
