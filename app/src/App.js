import React from "react";
import { Provider } from "react-redux";
import Layout from "./layout/Layout";
import { store } from "./redux/Store";

/**
 *  Integration with App Shell
 */
export let callbackFunc = null;

const App = ({ prefixPath, callback }) => {
  callbackFunc = callback;
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
