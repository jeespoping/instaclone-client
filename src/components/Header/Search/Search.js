import React, { useEffect, useState } from "react";
import { Search as SearchUS } from "semantic-ui-react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../../gql/user";
import "./Search.scss";

export default function Search() {
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState([]);

  const { data, loading } = useQuery(SEARCH, {
    variables: {
      search,
    },
  });

  useEffect(() => {
    if (size(data?.search) > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avata: user.avatar,
        });
      });
      setResult(users);
    } else {
      setResult([]);
    }
  }, [data]);

  const onChange = (e) => {
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };

  return (
    <SearchUS
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      loading={loading}
      value={search || ""}
      results={result}
      resultRenderer={(e) => <ResultSearch data={e} />}
      onSearchChange={onChange}
    />
  );
}

function ResultSearch({ data }) {
  return (
    <div>
      <h2>Hola mundo</h2>
    </div>
  );
}
