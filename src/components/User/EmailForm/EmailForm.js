import React from "react";
import { Form, Button } from "semantic-ui-react";
import "./EmailForm.scss";

export default function EmailForm({ onLogout }) {
  return (
    <Form className="email-form">
      <Form.Input placeholder="Escribe tu nuevo email" name="email" />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
