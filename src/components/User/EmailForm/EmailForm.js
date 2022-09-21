import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./EmailForm.scss";
import { toast } from "react-toastify";

export default function EmailForm({ setShowModal, currentEmail }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validateOnChange: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: {
              email: formData.email,
            },
          },
        });
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar el email");
      }
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
