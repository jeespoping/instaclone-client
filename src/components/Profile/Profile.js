import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import "./Profile.scss";
import ImageNoFound from "../../assets/png/avatar.png";
import { GET_USER } from "../../gql/user";
import UserNotFound from "../UserNotFound/UserNotFound";
import ModalBasic from "../Modal/ModalBasic/ModalBasic";

export default function Profile({ username }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  const [showModal, setShowModal] = useState(false);

  if (loading) return null;

  if (error) {
    return <UserNotFound />;
  }

  const { getUser } = data;

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image src={ImageNoFound} avatar onClick={() => setShowModal(true)} />
        </Grid.Column>
        <Grid.Column width={10} className="profile__right">
          <div>HeaderPrfile</div>
          <div>Followers</div>
          <div className="other">
            <p className="name">{getUser.name}</p>
            {getUser.siteWeb && (
              <a href={getUser.siteWeb} className="siteWeb" target="_blank">
                {getUser.siteWeb}
              </a>
            )}
            {getUser.description && (
              <p className="description">{getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title="Subir avatar">
        <p>Opciones ...</p>
        <p>Opciones ...</p>
        <p>Opciones ...</p>
        <p>Opciones ...</p>
      </ModalBasic>
    </>
  );
}
