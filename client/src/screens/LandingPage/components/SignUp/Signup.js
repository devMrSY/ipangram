import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import urls from "../../../../global/constants/UrlConstants";
import { useHistory } from "react-router-dom";
import { token, userId, user_type } from "../../../../redux/authSlice";
import { loggedIn } from "../../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { signUp } from "./SignUpService";

const SignupForm = () => {
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    user_type: "",
    departmentIds: [],
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // getAuthData();
  }, []);

  const handleFieldChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(info).then((res) => {
        dispatch(token(res.token));
        dispatch(user_type(res.user_type));
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
            label='first_name'
            type='text'
            name='first_name'
            value={info.first_name}
            onChange={handleFieldChange}
            required
          />
          <TextField
            label='last_name'
            type='text'
            name='last_name'
            value={info.last_name}
            onChange={handleFieldChange}
            required
          />
          <TextField
            label='email'
            type='email'
            name='email'
            value={info.email}
            onChange={handleFieldChange}
            required
          />
          <TextField
            label='password'
            type='password'
            name='password'
            value={info.password}
            onChange={handleFieldChange}
            required
          />
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup
            aria-label='gender'
            name='gender'
            value={info.gender}
            onChange={handleFieldChange}
            row
          >
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
          </RadioGroup>

          <FormLabel component='legend'>User Type</FormLabel>
          <RadioGroup
            aria-label='user_type'
            name='user_type'
            value={info.user_type}
            onChange={handleFieldChange}
            row
          >
            <FormControlLabel
              value='employee'
              control={<Radio />}
              label='Employee'
            />
            <FormControlLabel
              value='manager'
              control={<Radio />}
              label='manager'
            />
          </RadioGroup>

          <Button type='submit' variant='contained' onClick={handleSubmit}>
            Sign Up
          </Button>
          <Button
            variant='contained'
            onClick={() => history.push(urls.loginViewPath)}
          >
            Go to Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default SignupForm;
