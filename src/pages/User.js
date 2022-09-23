import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PUBLICATIONS } from "../gql/publication";
import { size } from "lodash";
import Profile from "../components/User/Profile";

export default function User() {
  const { username } = useParams();
  const { data, loading } = useQuery(PUBLICATIONS, {
    variables: {
      username,
    },
  });

  if (loading) return null;

  const { getPublications } = data;

  return (
    <>
      <Profile totalPublications={size(getPublications)} username={username} />
    </>
  );
}
