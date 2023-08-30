import mongoose, { Schema } from "mongoose";

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pictures: [{ type: Schema.Types.ObjectId, ref: "Picture" }],
  plantType: { type: Schema.Types.ObjectId, ref: "Type", required: true },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
  lastModifiedDate: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("Article", articleSchema);