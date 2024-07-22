import http from 'http'
import { Server } from 'socket.io';

const users = {};
const admins = {}

function getUserSocketId(userId) {
    return users[userId];
}

function getAdminSocketId(adminId) {
    return admins[adminId];
}

const realtimeNotification = (app) => {
    console.log('realtime notification work !!')
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
          origin: '*',
        }
      });

    // listen client 
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // register noti
        //  user
        socket.on('register', (userId) => {
            // register client socket ID
            users[userId] = socket.id;
            console.log(users);
            console.log(`User ${userId} registered with socket ID ${socket.id}`);
        });

        //  admin
        socket.on('register-admin', (adminId) => {
            // register client socket ID
            console.log(admins);
            admins[adminId] = socket.id;
            console.log(`admin ${adminId} registered with socket ID ${socket.id}`);
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

            for (let adminId in admins) {
                if (admins[adminId] === socket.id) {
                    delete admins[adminId];
                    console.log(`admin ${adminId} unregistered`);
                    break;
                }
            }

            // console.log(users);
            // console.log(admins);
        });
    });

    // add io to req | res
    app.use((req, res, next) => {
        req.io = io;
        req.getUserSocketId = getUserSocketId;
        req.getAdminSocketId = getAdminSocketId;
        next();
    });

    server.listen(4133, () => {
        console.log('server socket running at http://localhost:4133');
    });
}

export default realtimeNotification