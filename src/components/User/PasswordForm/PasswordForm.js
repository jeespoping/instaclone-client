import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./PasswordForm.scss";

export default function PasswordForm() {
  const formik = useFormik({
    initialValues: initialValuse(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassword")]),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("currentPassword")]),
    }),
    onSubmit: (formValue) => {
      console.log("Formulario enviado");
      console.log(formValue);
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        error={formik.errors.currentPassword && true}
        onChange={formik.handleChange}
        value={formik.values.currentPassword}
        placeholder="Contraseña actual"
        name="currentPassword"
      />
      <Form.Input
        type="password"
        error={formik.errors.newPassword && true}
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        placeholder="Nueva contraseña"
        name="newPassword"
      />
      <Form.Input
        type="password"
        error={formik.errors.repeatNewPassword && true}
        onChange={formik.handleChange}
        value={formik.values.repeatNewPassword}
        placeholder="Repetir nueva contraseña"
        name="repeatNewPassword"
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

function initialValuse() {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}
