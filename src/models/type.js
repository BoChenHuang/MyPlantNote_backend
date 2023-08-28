import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  public: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, required: true },
  lastModifiedDate: { type: Date, default: Date.now, required: true },
  createDate: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("type", typeSchema);
