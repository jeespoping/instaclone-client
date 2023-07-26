import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import Action from "../../Modal/ModalPublication/Actions";
import CommentForm from "../../Modal/ModalPublication/CommentForm";
import ModalPublication from "../../Modal/ModalPublication";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Feed.scss";

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [publicationSet, setPublicationSet] = useState(null);
  const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

  if (loading) return null;
  const { getPublicationsFlloweds } = data;

  const openPublication = (publication) => {
    setPublicationSet(publication);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed">
        {map(getPublicationsFlloweds, (publication, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${publication.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  src={publication.idUser.avatar || ImageNotFound}
                  avatar
                />
                <span>{publication.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${publication.file}")` }}
              onClick={() => openPublication(publication)}
            />
            <div className="feed__box-actions">
              <Action publication={publication} />
            </div>
            <div className="feed__box-form">
              <CommentForm publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          showModal={showModal}
          setShowModal={setShowModal}
          publiction={publicationSet}
        />
      )}
    </>
  );
}
