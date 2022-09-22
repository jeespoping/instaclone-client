import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import "./Followers.scss";
import { size } from "lodash";
import ModalBasic from "../../../Modal/ModalBasic";

export default function Followers({ username }) {
  const [showmodal, setShowmodal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: {
      username,
    },
  });

  useEffect(() => {
    startPollingFollowers(1000);
    return () => {
      stopPollingFollowers();
    };
  }, [startPollingFollowers, stopPollingFollowers]);

  const openFollowers = () => {
    setTitleModal("Seguidores");
    setChildrenModal(
      <div>
        <h3>Lista de seguidores</h3>
      </div>
    );
    setShowmodal(true);
  };

  if (loadingFollowers) return null;

  return (
    <>
      <div className="followers">
        <p>
          <span>**</span> publicaciones
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{size(dataFollowers.getFollowers)}</span> seguidores
        </p>
        <p className="link">
          <span>**</span> seguidos
        </p>
      </div>
      <ModalBasic show={showmodal} setShow={setShowmodal} title={titleModal}>
        <h2>Usuario</h2>
      </ModalBasic>
    </>
  );
}
