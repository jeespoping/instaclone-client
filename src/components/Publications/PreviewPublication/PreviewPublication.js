import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import ModalPubliction from "../../Modal/ModalPublication";
import "./PreviewPublication.scss";

export default function PreviewPublication({ publiction }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="preview-publication" onClick={() => setShowModal(true)}>
        <Image className="preview-publication__image" src={publiction.file} />
      </div>
      <ModalPubliction
        publiction={publiction}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}
