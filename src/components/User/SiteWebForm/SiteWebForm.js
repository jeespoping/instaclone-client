import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./SiteWebForm.scss";

export default function SiteWebForm({ refetch, currentSiteWeb, setShowModal }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: { siteWeb: currentSiteWeb },
    validationSchema: Yup.object({
      siteWeb: Yup.string().required(),
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
        toast.error("Error al actualizar el sitio web");
      }
    },
  });

  return (
    <Form className="site-web-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="siteWeb"
        placeholder="URL web"
        error={formik.errors.siteWeb}
        onChange={formik.handleChange}
        value={formik.values.siteWeb}
      />
      <Button className="btn-submit" type="submit">
        Actualizar
      </Button>
    </Form>
  );
}
