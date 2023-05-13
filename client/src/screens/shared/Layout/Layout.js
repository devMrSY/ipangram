import layoutStyles from "./Layout.styles";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../../global/components/PrivateRoute/PrivateRoute";
import { Box, Button } from "@mui/material";
import urls from "../../../global/constants/UrlConstants";
import Manager from "../../Manager/Manager";
import Employee from "../../Employee/Employee";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";

const Layout = () => {
  const classes = layoutStyles;

  const isAuthenticated = useSelector((state) => state.auth.authenticate);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getAuthData();
  // }, []);

  const getLogout = () => {
    dispatch(logout());
  };

  const getContent = () => {
    return (
      <Box sx={classes.content}>
        <Switch>
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={urls.managerViewPath}
            component={Manager}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={urls.employeeViewPath}
            component={Employee}
          />
        </Switch>
      </Box>
    );
  };

  const getLogoutButton = () => {
    return (
      <Button variant='contained' onClick={getLogout}>
        Logout
      </Button>
    );
  };

  const getLayout = () => {
    return (
      <>
        {isAuthenticated && getLogoutButton()}
        {getContent()}
        {/* {isLoading && <CustomLoader />} */}
      </>
    );
  };

  return getLayout();
};

export default Layout;
