import mongoose, { Schema } from "mongoose";

//TODO add image and owner
const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type: Schema.Types.ObjectId, required: true},
  owner: {type: Schema.Types.ObjectId, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  lastWateringDate: { type: Date, default: Date.now },
  wateringPeriod: { type: String, default: "1d"  },
  createDate: {type: Date, default: Date.now, required: true},
  lastModifiedDate: {type: Date, default: Date.now, required: true}
});

export default mongoose.model("plant", plantSchema);
