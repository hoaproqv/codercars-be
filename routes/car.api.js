const express = require("express");
const {
  createCar,
  getCars,
  editCar,
  deleteCar,
} = require("../controllers/car.controller");
const {
  validateCreateCarRequest,
} = require("../validate/validateCreateCarRequest");
const {
  validateEditCarRequest,
} = require("../validate/validateEditCarRequest");
const router = express.Router();

// CREATE
router.post("/", validateCreateCarRequest, createCar);

// READ
router.get("/", getCars);

// UPDATE
router.put("/:id", validateEditCarRequest, editCar);

// // DELETE
router.delete("/:id", deleteCar);

module.exports = router;
