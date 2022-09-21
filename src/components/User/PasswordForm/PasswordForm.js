import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./PasswordForm.scss";

export default function PasswordForm({ onLogout }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: initialValuse(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassword")]),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async (formValues) => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: formValues.currentPassword,
              newPassword: formValues.newPassword,
            },
          },
        });
        if (!result.data.updateUser) {
          toast.error("Error al cambiar la contraseña");
        } else {
          onLogout();
        }
      } catch (error) {
        toast.error("Error al cambiar la contraseña");
      }
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
