import mongoose, { Schema } from "mongoose";


const pictureSchema = mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    fileName: {type: String, required: true},
    fileSize: {type: Number, required: true},
    base64: {type: String, required: true},
    createDate: {type: Date, default: Date.now, required: true},
})

export default mongoose.model("Picture", pictureSchema);