import mongoose, {Document, Schema} from "mongoose";

interface IMessage extends Document {
    username: string,
    content: string,
    timestampe: Date
}

const messageSchema = new Schema<IMessage>({
    username: {type: String, required: true},
    content: {type: String, required: true},
    timestampe: {type: Date, default: Date.now}
})

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;