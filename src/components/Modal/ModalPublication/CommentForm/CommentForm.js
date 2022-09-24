import React from "react";
import { Form, Button } from "semantic-ui-react";
import "./CommentForm.scss";

export default function CommentForm({ publiction }) {
  return (
    <Form className="comment-form">
      <Form.Input placeholder="Añade un comentario..." name="comment" />
      <Button type="submit">Publicar</Button>
    </Form>
  );
}