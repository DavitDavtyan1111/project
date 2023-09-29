//@ts-nocheck
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";

import axios from "../utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const rows2 = [
//   { name: "Frozen yoghurt", a: "100", b: "200", c: "300", d: "400" },
// ];

export default function Home() {
  //mui
  const [open, setOpen] = React.useState(false);
  const openAddModal = () => setOpen(!open);
  const [openEdit, setOpenEdit] = React.useState(false);
  const openEditModal = () => {
    setOpenEdit(!openEdit);
  };
  //get users
  const [users, setUsers] = React.useState([]);
  //update
  const [updateFirstName, setUpdateFirstName] = React.useState("");
  const [updateLastName, setUpdateLastName] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  //create
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //paginate
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const fetchUsers = async (page) => {
    try {
      const { data } = await axios.get(`/user/users?page=${page}`);
      // console.log(data);

      setUsers(data.users);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/user/users/${userId}`);
      const filteredUsers = users.filter((item) => item._id !== userId);
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userId) => {
    if (updateFirstName.length && updateLastName.length) {
      try {
        axios.put(`user/users/${userId}`, {
          updateFirstName,
          updateLastName,
        });

        setUpdateFirstName("");
        setUpdateLastName("");
        const updatedUsers = users.map((item) => {
          if (item._id === userId) {
            return {
              ...item,
              firstName: updateFirstName,
              lastName: updateLastName,
            };
          }
          return item;
        });
        setUsers(updatedUsers);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createUser = async () => {
    if (
      firstName.length &&
      lastName.length &&
      email.length &&
      password.length
    ) {
      try {
        const { data } = await axios.post("user/users", {
          firstName,
          lastName,
          email,
          password,
        });
        fetchUsers();

        toast(data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  if (!users.length) {
    return <div></div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.firstName}
                </TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div onClick={() => setSelectedUserId(user._id)}>
                    <IconButton onClick={openEditModal}>
                      <EditIcon />
                    </IconButton>
                  </div>

                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openEdit}
                    onClose={openEditModal}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={openEdit}>
                      <Box sx={style}>
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
                            <Box
                              component="form"
                              noValidate
                              onSubmit={(e) => e.preventDefault()}
                              sx={{ mt: 3 }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    onChange={(e) =>
                                      setUpdateFirstName(e.target.value)
                                    }
                                    value={updateFirstName}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    onChange={(e) =>
                                      setUpdateLastName(e.target.value)
                                    }
                                    value={updateLastName}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    disabled
                                    variant="filled"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    disabled
                                    variant="filled"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                  />
                                </Grid>
                              </Grid>
                              <div onClick={() => updateUser(selectedUserId)}>
                                <Button
                                  onClick={openEditModal}
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}
                                >
                                  Edit
                                </Button>
                              </div>
                            </Box>
                          </Box>
                        </Container>
                      </Box>
                    </Fade>
                  </Modal>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteUser(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="center" mt="50px">
        <Grid item>
          <Button onClick={openAddModal} variant="contained">
            Add User
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={openAddModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
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
                    <Box
                      component="form"
                      noValidate
                      onSubmit={(e) => e.preventDefault()}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            onChange={(e) => setfirstName(e.target.value)}
                            value={firstName}
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            onChange={(e) => setlastName(e.target.value)}
                            value={lastName}
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                        </Grid>
                      </Grid>
                      <div onClick={createUser}>
                        <Button
                          onClick={openAddModal}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Add User
                        </Button>
                      </div>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Fade>
          </Modal>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" mt="50px">
        <Grid item>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
