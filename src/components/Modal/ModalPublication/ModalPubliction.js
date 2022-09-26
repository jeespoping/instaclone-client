import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import Actions from "./Actions";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
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

        <Grid.Column className="modal-publication__right" width={6}>
          <Comments publiction={publiction} />
          <Actions publication={publiction} />
          <CommentForm publiction={publiction} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
