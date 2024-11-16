import { Router } from "express";
import {
  getAdmins,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../Controllers/Users/users.controllers";

const router = Router();

router.get("/users", getUsers);
router.get("/users/admin", getAdmins);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
