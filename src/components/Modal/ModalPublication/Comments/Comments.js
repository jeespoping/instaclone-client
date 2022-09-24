import React from "react";
import { GET_COMMENTS } from "../../../../gql/comment";
import { useQuery } from "@apollo/client";
import "./Comments.scss";

export default function Comments({ publiction }) {
  const { data, loading } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publiction.id,
    },
  });
  if (loading) return null;
  return <div>Comments</div>;
}
