const User = require("../model/user");
const Parking = require("../model/parkinglot");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BookedParking = require("../model/bookedparking");

exports.home = (req, res) => {
  res.send("Hello World");
};

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, token } = req.body;
    if (!(firstname && lastname && email && password)) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }

    //checking if the user already exist
    const exstUser = await User.findOne({ email });
    if (exstUser) {
      return res.status(401).json({
        message: "User already exist",
      });
    }

    //hash password
    const encryptedpassword = await bcrypt.hash(password, 10);

    //Create new entry
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: encryptedpassword,
    });

    //generate a token and send it to user
    const tocken = jwt.sign(
      {
        id: user._id,
        email,
      },
      "mysecretkey",
      { expiresIn: "2h" }
    );

    user.token = tocken;

    //dont want to send this to the user
    user.password = undefined;
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "No user exist",
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      //create a token and send
      const token = jwt.sign(
        {
          id: user._id,
          email,
        },
        "mysecretkey",
        { expiresIn: "6h" }
      );

      user.token = token;
      user.password = undefined;

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, option).json({
        success: true,
        token,
        user,
      });
    } else {
      res.status(400).json({
        message: "email or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  // Clear the token from the client-side cookie
  res.clearCookie("token");

  // Send a response to the client to redirect them to the login page or any other page that makes sense for your application
  res.status(200).json({ message: "Logged out successfully" });
};

exports.userdetails = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(403).send("token is missing");
    }
    const decode = jwt.verify(token, "mysecretkey");
    const { email } = decode;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "No user exist",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.getallparkings = async (req, res) => {
  try {
    const allParkings = await Parking.find();
    if (!allParkings) {
      res.status(401).json({
        message: "No Parking exist",
      });
    } else {
      res.status(200).json(allParkings);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.getparkingdetail = async (req, res) => {
  try {
    const id = req.params.id;
    const parking = await Parking.findById(id);
    res.status(200).json(parking);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { vehicle, hour, amount, userId, parkingId } = req.body;
  console.log(vehicle, hour, amount, userId, parkingId);
  if (!(userId && vehicle && hour && amount && parkingId)) {
    return res.status(402).json({
      message: "All fields are required",
    });
  }
  //Create new entry
  const bookedparking = await BookedParking.create({
    bookedBy: userId,
    vehicle,
    hour,
    amount,
    bookedParking: parkingId,
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${vehicle} - ${hour}hr`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}?success=true`,
    cancel_url: `${req.headers.origin}?canceled=true`,
  });
  res.status(200).json(session);
  } catch (error) {
    console.log(error)
    res.status(401).json(error);
  }
};

//get booked history
exports.getbookedparking = async (req, res) => {
  const {id} = req.body
  try {
    const bookedparking = await BookedParking.find({bookedBy:id}).populate("bookedBy").populate("bookedParking");
    if (!bookedparking) {
      res.status(401).json({
        message: "No Parking exist",
      });
    } else {
      res.status(200).json(bookedparking);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error)
  }
};

exports.updatepayment = async(req,res) => {
  const {id} = req.body
  try {
    const bookedparking = await BookedParking.findOneAndUpdate({bookedBy: id},{isPaid: true}).populate("bookedBy");
      res.status(200).json(bookedparking);
  } catch (error) {
    console.log(error);
    res.status(401).json(error)
  }
}

