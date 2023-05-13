import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
// import history from "../../../../utils/history";
import urls from "../../../../global/constants/UrlConstants";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./LoginService";
import {
  loggedIn,
  token,
  userId,
  user_type,
} from "../../../../redux/authSlice";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleFieldChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(credentials).then((res) => {
        dispatch(user_type(res.user_type));
        dispatch(token(res.token));
        dispatch(loggedIn(true));
        dispatch(userId(res.userId));
      });
    } catch (error) {
      alert(error.message ?? error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label='Email'
            type='email'
            name='email'
            value={credentials.email}
            onChange={handleFieldChange}
            required
          />
          <TextField
            label='Password'
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleFieldChange}
            required
          />
          <Button type='submit' variant='contained'>
            Sign In
          </Button>
          <Button
            variant='contained'
            onClick={() => history.push(urls.signupViewPath)}
          >
            Go to Sign up
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
