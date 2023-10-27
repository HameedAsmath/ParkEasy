// URL PATH
const express = require("express");
const {
    createparking,
    viewparking,
    deleteparking,
    getparking,
    updateparking
} = require("../controllers/adminController");
const router = express.Router();

//Create Parking Lot
router.post("/createparking",createparking)

//View parking Lot
router.post("/viewparking",viewparking)

//delete parking Lot
router.delete("/deleteparking/:id", deleteparking)

//get parking Lot
router.get("/getparking/:id",getparking)

//update parking Lot
router.put("/updateparking/:id",updateparking)

module.exports = router;
