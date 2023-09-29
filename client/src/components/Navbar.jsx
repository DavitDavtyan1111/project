import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { logout } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const isAuth = Boolean(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You are log out");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="end">
            <Grid>
              {isAuth ? (
                <Button onClick={handleClick} color="inherit">
                  Logout
                </Button>
              ) : (
                <Box>
                  <NavLink to="/login">
                    <Button sx={{ color: "white" }}>Login</Button>
                  </NavLink>
                  <NavLink to="/register">
                    <Button sx={{ color: "white" }}>Sign Up</Button>
                  </NavLink>
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
