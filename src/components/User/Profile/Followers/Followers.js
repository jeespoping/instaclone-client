import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import "./Followers.scss";
import { size } from "lodash";

export default function Followers({ username }) {
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

  if (loadingFollowers) return null;

  return (
    <div className="followers">
      <p>
        <span>**</span> publicaciones
      </p>
      <p className="link">
        <span>{size(dataFollowers.getFollowers)}</span> seguidores
      </p>
      <p className="link">
        <span>**</span> seguidos
      </p>
    </div>
  );
}
