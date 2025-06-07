// src/useSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (): Socket | null => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // adjust if server runs elsewhere
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to server via socket:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
};
