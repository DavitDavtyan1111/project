import { Router } from "express";
const router = new Router();
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.post("/users", createUser);

export default router;
