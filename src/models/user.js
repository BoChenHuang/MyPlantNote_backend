import mongoose, { Schema } from "mongoose";

const userSchema = new  mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    password: {type: String, required: true},
    createDate: {type: Date, default: Date.now, required: true},
    lastModifiedDate: {type: Date, default: Date.now, required: true}
})

export default mongoose.model("user", userSchema);
