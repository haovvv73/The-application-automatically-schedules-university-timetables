import http from 'http'
import { Server } from 'socket.io';

const users = {};

function getUserSocketId(userId) {
    return users[userId];
}

const realtimeNotification = (app) => {
    console.log('realtime notification work !!')
    const server = http.createServer(app);
    const io = new Server(server);

    // listen client 
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

       // register 
        socket.on('register', (userId) => {
            // register client socket ID
            users[userId] = socket.id;
            console.log(`User ${userId} registered with socket ID ${socket.id}`);
        });

        // Xử lý khi client ngắt kết nối
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
            // delete client ID
            for (let userId in users) {
                if (users[userId] === socket.id) {
                    delete users[userId];
                    console.log(`User ${userId} unregistered`);
                    break;
                }
            }
        });
    });

    // add io to req | res
    app.use((req, res, next) => {
        req.io = io;
        req.getUserSocketId = getUserSocketId;
        next();
    });
}

export default realtimeNotification