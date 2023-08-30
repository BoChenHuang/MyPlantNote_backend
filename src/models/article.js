import mongoose, { Schema } from "mongoose";

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  pictures: [{ type: Schema.Types.ObjectId, ref: "picture" }],
  plantType: { type: Schema.Types.ObjectId, ref: "type", required: true },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
  lastModifiedDate: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("article", articleSchema);