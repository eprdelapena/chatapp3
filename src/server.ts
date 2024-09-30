import { Server } from "socket.io";
import mongoose from "mongoose";

// MongoDB connection setup
const mongoURI = 'mongodb+srv://ceggeoconsultation:niceonetoyou23@cluster0.a1f7avf.mongodb.net/';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for messages
const messageSchema = new mongoose.Schema({
    content: String,
    roomName: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Create Socket.IO server
const io = new Server(3000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user is connected: ", socket.id);

    socket.on("message", async (message, roomName) => {
        console.log(`Message from ${socket.id} in room ${roomName}: ${message}`);
        
        // Save message to MongoDB
        const newMessage = new Message({ content: message, roomName });
        await newMessage.save();

        // Emit message to all clients
        io.emit("message", { message, roomName });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

console.log("Socket.IO server running on port 3000");
