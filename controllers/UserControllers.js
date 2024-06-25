const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');


// Register User
const registerUser = async (req, res) => {
  const { displayName, email, password, profileImage } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
      const userAvailable = await User.findOne({email})
    if(userAvailable){
      return res.status(400).json({ message: "user already registered" });
    }

    const newUser = new User({ displayName, email, password: hashedPassword, profileImage });
    await newUser.save();
    res.status(201).json(newUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT token
      const accessToken = jwt.sign(
        {
          user: {
            displayName: user.displayName,
            email: user.email,
            id: user.id
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "500m" }
      );

      // Return the token
      return res.status(200).json({ accessToken });
    } else {
      // Invalid credentials
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    // Handle errors
    return res.status(500).json({ message: err.message });
  }
};

// Current User
const currentUser = async (req, res) => {
    res.json({message: "current user information" })
  }

module.exports = {registerUser, loginUser, currentUser}
