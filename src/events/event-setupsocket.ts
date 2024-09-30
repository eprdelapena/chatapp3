import { Server } from "socket.io";

export const setupSocket = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("a user is connected", socket.id);

        socket.on("disconnection", () => {
            console.log("user disconnected", socket.id);
        } )
    })

}