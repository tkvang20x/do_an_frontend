import React from "react";
import { Provider } from "react-redux";
import Layout from "./layout/Layout";
import { store } from "./redux/Store";

/**
 *  Integration with App Shell
 */

const App = ({ prefixPath }) => {
  return (
    <Provider store={store}>
      <>
        <Layout prefixPath={prefixPath ? prefixPath : ""}>
          <Layout />
        </Layout>
      </>
    </Provider>
  );
};

export default App;
