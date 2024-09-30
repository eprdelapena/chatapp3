import { Router } from "express";
import Message from "../models/message.js";
const router = Router();
const messageRoutes = (io) => {
    router.post("/", async (req, res) => {
        const { username, content } = req.body;
        const message = new Message({ username, content });
        await message.save();
        io.emit("message", message);
        res.status(201).json(message);
    });
    router.get("/", async (req, res) => {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    });
    return router;
};
export default messageRoutes;
