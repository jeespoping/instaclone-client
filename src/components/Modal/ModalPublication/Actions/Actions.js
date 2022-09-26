import React from "react";
import { Icon } from "semantic-ui-react";
import "./Actions.scss";

export default function Actions({ publication }) {
  return (
    <div className="actions">
      <Icon className="like" name="heart" />
      27 Likes
    </div>
  );
}
