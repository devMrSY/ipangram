import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import { Box } from "@mui/material";
import urls from "./global/constants/UrlConstants";
import Layout from "./screens/shared/Layout/Layout";
// import history from "./utils/history";

const App = () => {
  return (
    <Box>
      <Router>
        {/* <Router history={history}> */}
        <Switch>
          <Route
            exact
            path={["/", urls.loginViewPath, urls.signupViewPath]}
            component={LandingPage}
          />
          <Layout />
          <Route path={""} component={<>Page not found</>} />
        </Switch>
      </Router>
    </Box>
  );
};

export default App;
