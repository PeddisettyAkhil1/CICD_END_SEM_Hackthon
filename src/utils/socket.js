import { io } from "socket.io-client";

const socket = io("https://freelance-project-backend.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;