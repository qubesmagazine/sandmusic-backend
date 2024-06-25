const Track = require('../models/Track')

// Get All Tracks
const GetTrack = async (req, res) => {
  try {
    const tracks = await Track.find({user_id: req.user.id});
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add New Track
const AddTrack = async (req, res) => {
  const { name, albumImage, artists, songUrl } = req.body;

  try {
    const newTrack = new Track({ name, albumImage, artists, songUrl });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {GetTrack, AddTrack}
