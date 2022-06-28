const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
    price: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", PostSchema);
