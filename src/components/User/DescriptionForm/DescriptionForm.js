import React from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./DescriptionForm.scss";

export default function DescriptionForm({
  currentDescription,
  refetch,
  setShowModal,
}) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      description: currentDescription || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar la descripcion");
      }
    },
  });
  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <TextArea
        className={formik.errors.description && "error"}
        value={formik.values.description}
        onChange={formik.handleChange}
        name="description"
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
