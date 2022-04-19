import { Button } from "semantic-ui-react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </div>
    </ApolloProvider>
  );
}

export default App;
