import socketIO from 'socket.io-client';

const uri = 'http://localhost:8082';
const options = { transports: ['websocket'] };

const socket = socketIO(uri, options);

socket.on('connect', () => {
  console.log('connect');
})

socket.on('disconnect', () => {
  console.log('distconnect');
})

export default socket;