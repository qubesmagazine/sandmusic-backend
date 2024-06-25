const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  albumImage: {
    type: String,
  },
  title: {
    type: String,
  },
  artists: [
    {
      type: String,
    },
  ],
  songUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Track", TrackSchema);
