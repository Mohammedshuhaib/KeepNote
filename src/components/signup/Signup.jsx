import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Registerschema } from "../../validation/shema";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signup, reset, submitOtp } from "../../freatures/auth/authSlice";
import Spinner from "../spinner/Spinner";

// import "./Signup.scss";
const theme = createTheme();
function Signup() {
  const [sentOtp, setSentOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [err, setErr] = useState();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(Registerschema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if( message == 'User already exist') {
      setSentOtp(false)
    }
    if (isSuccess) {
      navigate("/");
    }
    
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);


  const submitForm = async (data, event) => {
    setSentOtp(false);
    setErr("");
    event.preventDefault();
    dispatch(signup(data));
    setSentOtp(true);
  };

  const verifyOtp = async () => {
    setErr("");
    dispatch(submitOtp(otp));
    if (isSuccess) {
      navigate("/");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submitForm)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  {...register("name")}
                />
                <p className="errorMessage">{formState.errors.name?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
                <p className="errorMessage">
                  {formState.errors.email?.message}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <p className="errorMessage">
                  {formState.errors.password?.message}
                </p>
              </Grid>
              {sentOtp && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="otp"
                    label="Enter Otp"
                    type="text"
                    id="otp"
                    autoComplete="Enter otp"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                  <p className="errorMessage">
                    {formState.errors.otp?.message}
                  </p>
                </Grid>
              )}
            </Grid>
            {sentOtp ? (
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={verifyOtp}
              >
                Verify otp
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            <p>{err}</p>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate('/')} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
