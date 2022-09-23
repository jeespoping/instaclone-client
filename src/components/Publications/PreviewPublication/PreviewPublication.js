import React from "react";
import { Image } from "semantic-ui-react";
import "./PreviewPublication.scss";

export default function PreviewPublication({ publiction }) {
  return (
    <>
      <div className="preview-publication">
        <Image className="preview-publication__image" src={publiction.file} />
      </div>
    </>
  );
}
