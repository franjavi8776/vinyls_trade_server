import { Router } from "express";

//! vinyls controllers
import {
  getVinyls,
  getVinyl,
  createVinyl,
  updateVinyl,
  deleteVinyl,
  getVinylsForTitle,
  getVinylsForGenre,
  getVinylsForTitleAD,
  getVinylsByDecade,
} from "../Controllers/Vinyls/vinyls.controllers";

const router = Router();

//! vinyls routes
router.get("/vinyls/search", getVinylsForTitle);
router.get("/vinyls/genre", getVinylsForGenre);
router.get("/vinyls/titleAD", getVinylsForTitleAD);
router.get("/vinyls/decade", getVinylsByDecade);
router.get("/vinyls", getVinyls);
router.get("/vinyls/:id", getVinyl);
router.post("/vinyls", createVinyl);
router.put("/vinyls/:id", updateVinyl);
router.delete("vinyls/:id", deleteVinyl);

export default router;
