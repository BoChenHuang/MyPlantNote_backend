import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema({
  plantId: { type: Schema.Types.ObjectId, required: true, ref: "Plant" },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  pictures: [{ type: Schema.Types.ObjectId, ref: "Picture" }],
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
  lastModifiedDate: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("Note", noteSchema);
