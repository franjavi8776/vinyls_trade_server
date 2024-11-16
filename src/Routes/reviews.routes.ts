import { Router } from "express";
import {
  createReview,
  getAllReviews,
} from "../Controllers/Users/reviews.controllers";

const router = Router();

router.get("/reviews", getAllReviews);
router.post("/reviews", createReview);

export default router;
