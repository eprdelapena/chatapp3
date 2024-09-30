import { Server } from "socket.io";
import mongoose from "mongoose";

const mongoURI = 'mongodb+srv://ceggeoconsultation:niceonetoyou23@cluster0.a1f7avf.mongodb.net/';
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error: ", err));

const messageSchema = new mongoose.Schema({
    content: String,
    roomName: String,
    createdAt: {type: Date, default: Date.now()}
})

const Message = mongoose.model("Message", messageSchema);

const PORTS = process.env.PORT || 3000;

const io = new Server(Number(PORTS), {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user is connected: ", socket.id);

    socket.on("joinRoom", async() => {
        console.log("joinRoom triggereds");
        const messages = await Message.find().sort({createdAt: 1});
        console.log("joinRoom triggered");
        console.log("current messages", messages);
        socket.emit("previousMessages", messages);
    })

    socket.on("message", async (message, roomName) => {
        console.log(`Message from ${socket.id} in room ${roomName}: ${message}`);

        const newMessage = new Message({content: message, roomName});
        await newMessage.save();

        io.emit("message", {message, roomName});
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    })
})

console.log("Socket.IO Server running on port 3000")