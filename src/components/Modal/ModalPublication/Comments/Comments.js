import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { GET_COMMENTS } from "../../../../gql/comment";
import { useQuery } from "@apollo/client";
import ImageNoFound from "../../../../assets/png/avatar.png";
import "./Comments.scss";

export default function Comments({ publiction }) {
  const { data, loading, stopPolling, startPolling } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publiction.id,
    },
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [stopPolling, startPolling]);

  if (loading) return null;

  const { getComments } = data;

  return (
    <div className="comments">
      {map(getComments, (comment, index) => (
        <Link
          key={index}
          to={`/${comment.idUser.username}`}
          className="comment"
        >
          <Image src={comment.idUser.avatar || ImageNoFound} avatar />
          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
