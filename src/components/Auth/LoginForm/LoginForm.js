import React from "react";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./LoginForm.scss";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email("El email no es valido").required(),
      password: Yup.string().required("LA contraseña es obligatorio"),
    }),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="login-form">
      <h2>Entra para ver fotos y videos de tus amigos</h2>
      <Form.Input
        onChange={formik.handleChange}
        type="text"
        placeholder="Correo electronico"
        name="email"
        value={formik.values.email}
        error={formik.errors.email && true}
      />
      <Form.Input
        onChange={formik.handleChange}
        type="password"
        placeholder="Contraseña"
        name="password"
        value={formik.values.password}
        error={formik.errors.password && true}
      />
      <Button type="submit" className="btn-submit">
        Iniciar sesión
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
