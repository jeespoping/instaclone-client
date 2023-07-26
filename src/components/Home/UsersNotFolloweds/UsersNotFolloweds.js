import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./UsersNotFolloweds.scss";

export default function UsersNotFolloweds() {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

  if (loading) return null;

  const { getNotFolloweds } = data;

  return <div className="user-not-followes">UsersNotFolloweds</div>;
}
