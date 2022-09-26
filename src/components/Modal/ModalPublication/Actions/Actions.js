import React from "react";
import { Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_LIKE } from "../../../../gql/like.";
import "./Actions.scss";

export default function Actions({ publication }) {
  const [addLike] = useMutation(ADD_LIKE);

  const onAddLike = async () => {
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actions">
      <Icon onClick={onAddLike} className="like" name="heart" />
      27 Likes
    </div>
  );
}
