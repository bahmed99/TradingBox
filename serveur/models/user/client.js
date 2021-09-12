const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const clientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    portfolio_size: {
      type: Number,
      required: true,
    },
    strategy_suggestion: {
      type: String,
      required: true,
    },
    api: {
      type: String,
      required: true,
    },
    secret_key: {
      type: String,
      required: true,
    },
    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);

Client = mongoose.model("Client", clientSchema);
module.exports = Client;
