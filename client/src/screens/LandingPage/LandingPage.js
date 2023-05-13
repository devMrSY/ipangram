import LoginForm from "./components/Login/Login";
import SignupForm from "./components/SignUp/Signup";
import strings from "../../global/constants/StringConstants";
import urls from "../../global/constants/UrlConstants";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

// import landingPageStyles from "./LandingPage.styles";

const LandingPage = (props) => {
  // const classes = landingPageStyles;
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.authenticate);
  const user_type = useSelector((state) => state.auth.user_type);

  const redirectPage = (role) => {
    switch (role) {
      case strings.MANAGER:
        return urls.managerViewPath;
      case strings.EMPLOYEE:
        return urls.employeeViewPath;
      default:
        return urls.loginViewPath;
    }
  };

  const getComponentBasedOnURL = () => {
    const location = props.location?.pathname?.split("/")[1].toLowerCase();
    switch (location) {
      case strings.LOGIN: {
        return <LoginForm />;
      }
      case strings.SIGNUP: {
        return <SignupForm />;
      }
      default: {
        history.push(urls.loginViewPath);
      }
    }
  };

  const getLandingPage = () => {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          {getComponentBasedOnURL()}
        </Grid>
      </Grid>
    );
  };

  if (isLoggedIn) {
    let url = redirectPage(user_type);
    history.push(url);
    return null;
  } else {
    return getLandingPage();
  }
};

export default LandingPage;
