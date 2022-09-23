import React, { useCallback, useState } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "../../../gql/publication";
import "./ModalUpload.scss";
import { toast } from "react-toastify";

export default function ModalUpload({ show, setShow }) {
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading();
    setFileUpload(null);
    setShow(false);
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const result = await publish({
        variables: {
          file: fileUpload.file,
        },
      });
      const { data } = result;
      if (!data.publish.status) {
        toast.warning("Error en la publicacion");
        setIsLoading(false);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal className="modal-upload" size="small" open={show} onClose={onClose}>
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Arrastra tu foto o video que quieras publicar</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>

      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        />
      )}

      {fileUpload && (
        <Button onClick={onPublish} className="btn-upload btn-action">
          Publicar
        </Button>
      )}

      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando ...</p>
        </Dimmer>
      )}
    </Modal>
  );
}
