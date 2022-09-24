import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../gql/comment";
import "./CommentForm.scss";

export default function CommentForm({ publiction }) {
  const [addcomment] = useMutation(ADD_COMMENT);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validateSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await addcomment({
          variables: {
            input: {
              idPublication: publiction.id,
              comment: formData.comment,
            },
          },
        });
        formik.handleReset();
      } catch (error) {
        console.log(error);
      }
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
