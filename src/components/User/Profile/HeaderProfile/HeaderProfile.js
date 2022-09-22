import React from "react";
import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW } from "../../../../gql/follow";
import "./HeaderProfile.scss";

export default function HeaderProfile({ getUser, auth, handlerModal }) {
  const [follow] = useMutation(FOLLOW);

  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: {
      username: getUser.username,
    },
  });

  const buttonFollow = () => {
    if (data.isFollow) {
      return <Button className="btn-danger">Dejar de seguir</Button>;
    } else {
      return (
        <Button onClick={onFollow} className="btn-action">
          Seguir
        </Button>
      );
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header-profile">
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username ? (
        <Button onClick={() => handlerModal("setting")}>Ajuste</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
}
