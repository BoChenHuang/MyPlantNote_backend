import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema({
  tile: {type: String, required: true},
  pictures: [{ type : Schema.Types.ObjectId, ref: 'picture' }],
  content: {type: String, required: true},
  createDate: {type: Date, default: Date.now, required: true},
  lastModifiedDate: {type: Date, default: Date.now, required: true}
});

export default mongoose.model("note", noteSchema);
