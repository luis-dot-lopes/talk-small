import openSocket from 'socket.io-client';
const socket = openSocket('https://localhost:3001');


function communicateWithApi(cb) {
	socket.on()
}

export { communicateWithApi };