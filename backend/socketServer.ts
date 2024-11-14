import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Join a room
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Leave a room
    socket.on('leave-room', (room) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    // Broadcast to a room
    socket.on('launch-rocket', (room, rocketDetails) => {
      io.to(room).emit('launched', rocketDetails);  // Emit the room that a rocket was launched
      console.log(`rocket ${rocketDetails.name} was launched to room ${room}`);
    });

    // Broadcast to all except sender
    socket.on('intercept-rocket', (room, rocketDetails) => {
        io.to(room).emit('intercepted', rocketDetails);
        console.log(`rocket ${rocketDetails.name} was intercepted in room ${room}`);
    });

    socket.on("hit-rocket", (room, rocketDetails) => {
        io.to(room).emit("hitted", rocketDetails);
        console.log(`rocket ${rocketDetails.name} was hit in room ${room}`);
    });

    // Volatile event example (heartbeat)

    // setInterval(() => {
    //   socket.volatile.emit('heartbeat', { time: new Date().toISOString() });  // Emit heartbeat every second
    // }, 1000);

    socket.on('disconnect', (reason) => {
      console.log('A user disconnected', socket.id, 'reason:', reason);
    });
  });

  return io;
}