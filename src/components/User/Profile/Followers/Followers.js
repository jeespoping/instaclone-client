import React from "react";
import "./Followers.scss";

export default function Followers({ username }) {
  return (
    <div className="followers">
      <p>
        <span>50</span> publicaciones
      </p>
      <p className="link">
        <span>267</span> seguidores
      </p>
      <p className="link">
        <span>165</span> seguidos
      </p>
    </div>
  );
}
