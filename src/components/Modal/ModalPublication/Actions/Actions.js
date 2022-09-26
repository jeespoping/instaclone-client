import React from "react";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  COUNT_LIKE,
  DELETE_LIKE,
  IS_LIKE,
} from "../../../../gql/like.";
import "./Actions.scss";

export default function Actions({ publication }) {
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });
  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const onAddLike = async () => {
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteLike = async () => {
    try {
      await deleteLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || loadingCount) return null;

  const { isLike } = data;
  const { countLike } = dataCount;

  return (
    <div className="actions">
      <Icon
        onClick={isLike ? onDeleteLike : onAddLike}
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
      />
      {countLike} {countLike === 1 ? "Like" : "Likes"}
    </div>
  );
}
