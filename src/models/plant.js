import mongoose, { Schema } from "mongoose";

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type: Schema.Types.ObjectId, ref: "Type", required: true},
  owner: {type: Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true, default: Date.now },
  lastWateringDate: { type: Date, default: Date.now },
  wateringPeriod: { type: String, default: "1d"  },
  notes: [{ type : Schema.Types.ObjectId, ref: 'Note' }],
  pictures: [{ type : Schema.Types.ObjectId, ref: 'Picture' }],
  createDate: {type: Date, default: Date.now, required: true},
  lastModifiedDate: {type: Date, default: Date.now, required: true}
});

export default mongoose.model("Plant", plantSchema);
