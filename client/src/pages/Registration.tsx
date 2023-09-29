// @ts-nocheck

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/authSlice";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function Registration() {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const token = useSelector((state) => state.auth.token);
  const isAuth = Boolean(token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate("/");
    }
  }, [status, isAuth, navigate]);

  const handleClick = () => {
    if (
      firstName.length &&
      lastName.length &&
      email.length &&
      password.length
    ) {
      dispatch(registerUser({ firstName, lastName, email, password }));
      navigate("/login");
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <NavLink to="/login">Already have an account? Sign in</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
