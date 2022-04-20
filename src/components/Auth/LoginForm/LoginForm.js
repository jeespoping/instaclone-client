import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { useFormik } from "formik";
import { decodeToken, setToken } from "../../../utils/token";
import "./LoginForm.scss";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm() {
  const [login] = useMutation(LOGIN);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email("El email no es valido").required(),
      password: Yup.string().required("LA contraseña es obligatorio"),
    }),
    onSubmit: async (formData) => {
      setError("");
      try {
        const { data } = await login({
          variables: {
            input: formData,
          },
        });
        const { token } = data.login;
        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
      }
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
      {error && <p className="submit-error">{error}</p>}
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
