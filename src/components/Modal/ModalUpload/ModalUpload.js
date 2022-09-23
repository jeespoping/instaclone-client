import React from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import "./ModalUpload.scss";

export default function ModalUpload({ show, setShow }) {
  const onClose = () => {
    setShow(false);
  };
  return (
    <Modal className="modal-upload" size="small" open={show} onClose={onClose}>
      <h1>Esto es el modal Upload</h1>
    </Modal>
  );
}
