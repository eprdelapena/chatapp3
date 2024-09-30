export const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("a user is connected", socket.id);
        socket.on("disconnection", () => {
            console.log("user disconnected", socket.id);
        });
    });
};
