import React from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { toast } from "react-toastify";
import "./DescriptionForm.scss";

export default function DescriptionForm({
  currentDescription,
  refetch,
  setShowModal,
}) {
  return (
    <Form className="description-form">
      <TextArea name="description" />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
