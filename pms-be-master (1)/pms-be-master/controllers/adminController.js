const Parking = require("../model/parkinglot");

exports.createparking = async (req, res) => {
  try {
    const {
      email,
      refid,
      area,
      state,
      lat,
      lng,
      carlot,
      caramount,
      bikelot,
      bikeamount,
      buslot,
      busamount,
    } = req.body;
    if (
      !(
        email &&
        refid &&
        area &&
        state &&
        lat &&
        lng &&
        carlot &&
        caramount &&
        bikeamount &&
        bikelot &&
        buslot &&
        busamount
      )
    ) {
      return res.status(402).json({
        message: "All fields are required",
      });
    }
    //checking if the user already exist
    const exstUser = await Parking.findOne({ area });
    if (exstUser) {
      return res.status(401).json({
        message: "Already Created",
      });
    }
    //Create new entry
    const parking = await Parking.create({
      email,
      refid,
      area,
      state,
      lat,
      lng,
      carlot,
      caramount,
      bikelot,
      bikeamount,
      buslot,
      busamount,
    });
    res.status(201).json(parking);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.viewparking = async (req, res) => {
  const {email} = req.body 
  const allparking = await Parking.find({email});
  if (!allparking) {
    return res.status(400).json({
      message: "No documents found"
    });
  }
  res.status(200).json(allparking)
};

exports.deleteparking = async(req,res) =>{
    try {
        const id = req.params.id
        const deletedParking = await Parking.findByIdAndDelete(id)
        res.status(200).json(deletedParking);
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getparking = async(req,res)=>{
  try {
    const id = req.params.id
    const updateParking = await Parking.findById(id)
    res.status(200).json(updateParking)
  } catch (error) {
    console.log(error)
    res.status(401).json(error);
  }
}

exports.updateparking = async(req,res) =>{
  try {
      const id = req.params.id
      const updateParking = await Parking.findByIdAndUpdate(id,req.body)
      res.status(200).json(updateParking);
  } catch (error) {
      res.status(401).json(error);
  }
}