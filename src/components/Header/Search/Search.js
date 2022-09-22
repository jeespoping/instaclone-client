import React from "react";
import { Search as SearchUS } from "semantic-ui-react";
import "./Search.scss";

export default function Search() {
  return (
    <SearchUS
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
    />
  );
}
