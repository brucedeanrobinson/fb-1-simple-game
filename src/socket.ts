// src/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Use your actual backend origin

export default socket;
