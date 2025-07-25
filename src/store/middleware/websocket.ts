import { Middleware } from '@reduxjs/toolkit';
import { logoutSilence, getProfile, TProfile } from '../slices/auth';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const connect = (user: TProfile, store: any) => {
  console.log('Socket.io connecting');

  if (socket) {
    socket.disconnect();
  }

  socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/website`, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('Socket.io connected to website namespace');

    const userId = user.id;

    if (userId) {
      socket?.emit('website-state-join', { userId });
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket.io disconnected', reason);
    if (reason === 'io server disconnect') {
      setTimeout(() => socket?.connect(), 1000);
    }
  });

  socket.on('connect_error', (error) => {
    console.error('Socket.io connection error', error);
  });

  socket.on('message', (data) => {
    console.log('Website state update:', data);
  });
};

const disconnect = () => {
  console.log('Socket.io disconnecting');
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

const websocketMiddleware: Middleware = (store) => {
  // if (typeof window !== 'undefined') {
  //   const state = store.getState();
  //   const token = state.auth?.token;
  //   if (token) {
  //     connect(token, store);
  //   }
  // }

  return (next) => (action) => {
    if (
      action.type === `${getProfile.typePrefix}/fulfilled` &&
      action.payload
    ) {
      connect(action.payload, store);
    }
    if (logoutSilence.match(action)) {
      disconnect();
    }
    return next(action);
  };
};

export default websocketMiddleware;
