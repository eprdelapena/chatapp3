import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    timestampe: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema);
export default Message;
