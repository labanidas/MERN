import express from "express";
import {login, logout, signup, updateProfile, checkAuth} from "../controllers/auth.controller.js"
import { protectedRoute } from "../middleware/auth.middlewear.js";

const router =  express.Router();


router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectedRoute,  updateProfile); //update only profile image, protectedRoute in a middlewear


router.get("/check", protectedRoute, checkAuth);

export default router;