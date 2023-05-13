import { Route, Redirect, RouteProps } from "react-router-dom";
import urls from "../../constants/UrlConstants";
import React from "react";

const PrivateRoute = (props) => {
  const { component: Component, isLoggedIn, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: urls.loginViewPath,
              state: {
                from: routeProps.location,
                search: routeProps.location.search,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
