// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");

// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.json({ message: "User register successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not Found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "login sucessfully", token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role:"Company"
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email , role:user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (req.user.id !== id) {
      return res.status(403).json({ message: "Unauthorized user" });
    }

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    const emailExists = await User.findById(id);

    if (emailExists && emailExists._id.toString() !== id) {
      return res.status(400).json({ message: "Email already in use" });
    }

    await User.findByIdAndUpdate(id, { name, email }, { new: true });

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // req.user.id

    // if (req.user.id !== id) {
    //   return res.status(403).json({ message: "Unauthorized user" });
    // }

    if(
         req.user.role !== "Admin" && 
         req.user.id !== id
      ){
         return res.status(403).json({
            message:"Unauthorized user"
         });
      }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL USERS
exports.getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      users,
      message: "Users fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET USER BY ID
exports.getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user,
      message: "User fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
