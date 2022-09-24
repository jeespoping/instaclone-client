import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import "./ModalPubliction.scss";

export default function ModalPubliction({
  showModal,
  setShowModal,
  publiction,
}) {
  const onClose = () => setShowModal(false);

  return (
    <Modal className="modal-publication" open={showModal} onClose={onClose}>
      <Grid>
        <Grid.Column
          className="modal-publication__left"
          width={10}
          style={{ backgroundImage: `url("${publiction.file}")` }}
        />

        <Grid.Column className="modal-pulication__right" width={6}>
          <h3>Comentarios</h3>
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
