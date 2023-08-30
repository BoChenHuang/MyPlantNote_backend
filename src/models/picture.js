import mongoose from "mongoose";


const pictureSchema = mongoose.Schema({
    fileName: {type: String, required: true},
    fileSize: {type: Number, required: true},
    base64: {type: String, required: true},
    createDate: {type: Date, default: Date.now, required: true},
})

export default mongoose.model("Picture", pictureSchema);