import { Server, Socket } from "socket.io";

const io = new Server({
  path: "/socket/io", // New path
  pingTimeout: 60000,
  cors: {
    origin: process.env.BASE_URL,
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("💀: A user disconnected");
  });
});

io.listen(4000);

export function emitEvent(event: string, data: any) {
  io.emit(event, data);
}
