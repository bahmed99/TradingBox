const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

News = mongoose.model("New", newsSchema);
module.exports = News;
