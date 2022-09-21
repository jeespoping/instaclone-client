import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import "./Profile.scss";
import ImageNoFound from "../../../assets/png/avatar.png";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import HeaderProfile from "./HeaderProfile";
import SettingsForm from "../SettingsForm";

export default function Profile({ username }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  const { auth } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [tittleModal, setTittleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  if (loading) return null;

  if (error) {
    return <UserNotFound />;
  }

  const handlerModal = (type) => {
    switch (type) {
      case "avatar":
        setTittleModal("Cambiar foto de perfil");
        setChildrenModal(
          <AvatarForm auth={auth} setShowModal={setShowModal} />
        );
        setShowModal(true);
        break;
      case "setting":
        setTittleModal("");
        setChildrenModal(
          <SettingsForm
            setShowModal={setShowModal}
            setTittleModal={setTittleModal}
            setChildrenModal={setChildrenModal}
          />
        );
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  const { getUser } = data;

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={getUser.avatar ? getUser.avatar : ImageNoFound}
            avatar
            onClick={() => username === auth.username && handlerModal("avatar")}
          />
        </Grid.Column>
        <Grid.Column width={10} className="profile__right">
          <HeaderProfile
            handlerModal={handlerModal}
            getUser={getUser}
            auth={auth}
          />
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
      <ModalBasic show={showModal} setShow={setShowModal} title={tittleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
