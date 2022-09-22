import React from "react";
import { Image } from "semantic-ui-react";
import ImageNoFound from "../../../assets/png/avatar.png";
import { map, size } from "lodash";
import { useHistory } from "react-router-dom";
import "./ListUsers.scss";

export default function ListUsers({ setShowmodal, users }) {
  const history = useHistory();

  const goToUser = (username) => {
    setShowmodal(false);
    history.push(`/${username}`);
  };

  return (
    <div className="list-users">
      {size(users) === 0 ? (
        <p className="list-users__not-users">No se han encontrado usuarios</p>
      ) : (
        map(users, (user, index) => (
          <div
            onClick={() => goToUser(user.username)}
            className="list-users__user"
            key={index}
          >
            <Image src={user.avatar || ImageNoFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
