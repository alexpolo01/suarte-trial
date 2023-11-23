const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const thoughtSchema = new mongoose.Schema(
  {
    thought_creator: {
      type: String,
      ref: "User",
      required: true,
      index: true,
    },
    thought_message: {
      type: String,
      required: true,
    },
    thought_artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: false,
    },
    thought_parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const tmpModel = mongoose.model("Thought", thoughtSchema);
const Thought = new KaindaModel(tmpModel);

Thought.__deleteThoughtsByArtworkId = async function (artworkId) {
  const thoughts = await tmpModel.find({ thought_artwork: artworkId });
  const ids = thoughts.map((thought) => thought._id); // get the ids
  await tmpModel.deleteMany({ thought_artwork: artworkId });
  return ids; // return the ids
};
Thought.ThoughtLike = require("./thoughtLike.modelsub");
module.exports = Thought;
