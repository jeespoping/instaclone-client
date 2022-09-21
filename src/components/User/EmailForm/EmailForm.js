import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./EmailForm.scss";

export default function EmailForm({ setShowModal, currentEmail }) {
  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validateOnChange: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });
  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.email && true}
        value={formik.values.email}
        placeholder="Escribe tu nuevo email"
        name="email"
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
