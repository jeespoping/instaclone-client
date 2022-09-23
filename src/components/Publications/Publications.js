import React from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import "./Publications.scss";

export default function Publications({ getPublications }) {
  return (
    <div className="publications">
      <h1>Publicaciones</h1>
      <Grid columns={4}>
        {map(getPublications, (publiction, index) => (
          <Grid.Column key={index}>{publiction.id}</Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
