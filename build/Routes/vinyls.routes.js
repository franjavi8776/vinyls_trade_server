"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//! vinyls controllers
const vinyls_controllers_1 = require("../Controllers/Vinyls/vinyls.controllers");
const router = (0, express_1.Router)();
//! vinyls routes
router.get("/vinyls/search", vinyls_controllers_1.getVinylsForTitle);
router.get("/vinyls/genre", vinyls_controllers_1.getVinylsForGenre);
router.get("/vinyls/titleAD", vinyls_controllers_1.getVinylsForTitleAD);
router.get("/vinyls/decade", vinyls_controllers_1.getVinylsByDecade);
router.get("/vinyls", vinyls_controllers_1.getVinyls);
router.get("/vinyls/:id", vinyls_controllers_1.getVinyl);
router.post("/vinyls", vinyls_controllers_1.createVinyl);
router.put("/vinyls/:id", vinyls_controllers_1.updateVinyl);
router.delete("vinyls/:id", vinyls_controllers_1.deleteVinyl);
exports.default = router;
