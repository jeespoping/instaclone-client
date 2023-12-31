import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PUBLICATIONS } from "../gql/publication";
import { size } from "lodash";
import Profile from "../components/User/Profile";
import Publications from "../components/Publications";

export default function User() {
  const { username } = useParams();
  const { data, loading, startPolling, stopPolling } = useQuery(PUBLICATIONS, {
    variables: {
      username,
    },
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;

  const { getPublications } = data;

  return (
    <>
      <Profile totalPublications={size(getPublications)} username={username} />
      <Publications getPublications={getPublications} />
    </>
  );
}
