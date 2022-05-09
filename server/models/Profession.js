const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // default: some
    },
  },
  {
    timestamps: true, // добавляет модели поля createdAt и updatedAt
  }
);

module.exports = model("Profession", schema);
