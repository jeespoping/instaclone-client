import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWEDS, GET_FOLLOWERS } from "../../../../gql/follow";
import "./Followers.scss";
import { size } from "lodash";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";

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

  const {
    data: dataFolloweds,
    loading: loadingFolloweds,
    startPolling: startPollingFolloweds,
    stopPolling: stopPollingFolloweds,
  } = useQuery(GET_FOLLOWEDS, {
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

  useEffect(() => {
    startPollingFolloweds(1000);
    return () => {
      stopPollingFolloweds();
    };
  }, [startPollingFolloweds, stopPollingFolloweds]);

  const openFollowers = () => {
    setTitleModal("Seguidores");
    setChildrenModal(
      <ListUsers
        setShowmodal={setShowmodal}
        users={dataFollowers.getFollowers}
      />
    );
    setShowmodal(true);
  };

  if (loadingFollowers || loadingFolloweds) return null;

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
          <span>{size(dataFolloweds.getFolloweds)}</span> seguidos
        </p>
      </div>
      <ModalBasic show={showmodal} setShow={setShowmodal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
