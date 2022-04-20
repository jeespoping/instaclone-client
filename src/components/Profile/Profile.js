import React from "react";
import { useQuery } from "@apollo/client";
import "./Profile.scss";
import { GET_USER } from "../../gql/user";

export default function Profile({ username }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;

  if (error) {
    return <h1>Usuario no encontrado</h1>;
  }

  const { getUser } = data;

  return <div>Profile</div>;
}
