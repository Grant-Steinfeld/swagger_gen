import express from "express";
import { validateGet, validateBody } from "../middlewares/validation";
import { getPets, addPet, updatePet, patchPet } from "../controllers/pets";

const router = express.Router();

router.get("/", validateGet, getPets);
router.post("/", validateBody, addPet);
router.put("/:id", validateBody, (req, res) => {
  // ... your logic ...
  res.status(200).json({
    /* ... */
  });
});
router.patch("/:id", validateBody, (req, res, next) => {
  Promise.resolve(patchPet(req, res)).catch(next);
});

export default router;
