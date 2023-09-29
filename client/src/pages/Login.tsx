//@ts-nocheck

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
import { loginUser } from "../redux/features/authSlice";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const isAuth = Boolean(token);
  const navigate = useNavigate();
  // const isAuth = useSelector(checkIsAuth);
  React.useEffect(() => {
    if (status) {
      toast(status);
      if (isAuth) {
        navigate("/");
      }
    }
  }, [status, isAuth, navigate]);

  const handleClick = () => {
    if (email.length && password.length) {
      dispatch(loginUser({ email, password }));
    }
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={handleClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <NavLink to="/register">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
