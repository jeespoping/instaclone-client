import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/png/avatar.png";
import ModalUpload from "../../Modal/ModalUpload";
import "./RightHeader.scss";

export default function RightHeader() {
  const { auth } = useAuth();

  const [show, setShow] = useState(false);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading || error) return null;
  const { getUser } = data;

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Icon onClick={() => setShow(true)} name="plus" />
        <Link to={`/${auth.username}`}>
          <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
        </Link>
      </div>
      <ModalUpload show={show} setShow={setShow} />
    </>
  );
}
