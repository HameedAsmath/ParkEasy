const express = require("express");
const {
  register,
  login,
  logout,
  dashboard,
  home,
  userdetails,
  getallparkings,
  getparkingdetail,
  createCheckoutSession,
  getbookedparking,
  updatepayment
} = require("../controllers/userControllers");
const router = express.Router();
const auth = require("../middleware/auth")

//Home route
router.get("/",home)

//Register route
router.post("/register", register);

//login route
router.post("/login", login);

//logout
router.get("/logout", logout)

//userdetails
router.post("/userdetails",auth,userdetails)

//get all parking
router.get("/getallparkings",auth,getallparkings)

//get parking detail
router.post("/getparkingdetail/:id",auth,getparkingdetail)

//stripe
router.post('/create-checkout-session', createCheckoutSession);

//get booked parking
router.post("/getbookedparking",auth,getbookedparking)

///update-payment-status
router.put("/update-payment-status",auth,updatepayment)


module.exports = router;
