var { Schema } = require("mongoose");
const mongoose = require("mongoose");

var TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    subtask: { type: Array, default: [], required: true },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
