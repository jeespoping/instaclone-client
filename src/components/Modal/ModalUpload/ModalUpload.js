import React, { useCallback } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./ModalUpload.scss";

export default function ModalUpload({ show, setShow }) {
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    console.log(acceptedFile);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal className="modal-upload" size="small" open={show} onClose={onClose}>
      <div {...getRootProps()} className="dropzone">
        <Icon name="cloud upload" />
        <p>Arrastra tu foto o video que quieras publicar</p>
        <input {...getInputProps()} />
      </div>
    </Modal>
  );
}
