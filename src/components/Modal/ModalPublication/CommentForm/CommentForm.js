import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./CommentForm.scss";
import { validateSchema } from "graphql";

export default function CommentForm({ publiction }) {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validateSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        value={formik.values.comment}
        error={formik.errors.comment}
        onChange={formik.handleChange}
        placeholder="Añade un comentario..."
        name="comment"
      />
      <Button type="submit">Publicar</Button>
    </Form>
  );
}
