const Trip = require("../models/Trip");
const User = require("../models/user");

//  createdBy:"6a0ef382191b82a78be78981"
//   from:
//   to:
//   startDate:
//   endDate:
//   price:

exports.createTrip = async (req, res) => {
  try {
    // const tripData = req.body;
    //     const tripData = {
    //   from: Ahmedabad
    //   to: Surat
    //   startDate:28-4-2026
    //   endDate:29-4-2026
    //   price:500
    // }

    // tripData.price=100;
    // const data = await Trip.create(tripData);//req.body nahi likhna hai jab value change karte hai tab
    // req.user.id
    const { from, to, startDate, endDate, price, transportMode } = req.body;

    const createdBy = req.user.id;

    if (!from || !to || !startDate || !endDate || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await Trip.create({
      from,
      to,
      startDate,
      endDate,
      price,
      createdBy,
      transportMode,
    });
    // const newUser = new Trip({
    //   from,
    //   to,
    //   startDate,
    //   endDate,
    //   price,
    //   createTrip,
    // });

    // await newUser.save();

    res.status(201).json({
      message: "Trip Created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTrip = async (req, res) => {
  try {
    const trips = await Trip.find();

    res.status(200).json({
      trips,
      message: "Trip fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id).populate("createdBy", "name email");

    // const trip = await Trip.findById(id);
    // const user = await User.findById(trip.createdBy)

    res.status(200).json({
      trip,
      // user,
      message: "Trip fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
