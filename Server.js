const net = require('net');

const server8000 = [];
const server8010 = [];

const socketing = () => {
  socket.on('error', err => {
    console.log('En användare har lämnat chatten...');
  });
  socket.on('close', () => {
    console.log('En användare har lämnat chatten...')
  })
}

const address = (socket) => {
  const remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
  console.log('Klient ansluten på: ', remoteAddress)
}

const server1 = net.createServer(socket => {
  server8000.push(socket);
  address(socket);
  socket.on('data', data => {
    broadcastServer1(data, socket);
  });
  socketing;
});

server1.listen(8000, () => {
  console.log(server1.address());
});

const broadcastServer1 = (msg, socketSent) => {
  if (msg.toString() === 'exit') {
    const index = server8000.indexOf(socketSent);
    server8000.splice(index, 1);
  } if (msg.toString() !== 'exit') {
    server8000.forEach(socket => {
      if (socket !== socketSent) socket.write(msg);
    })
  }
}

const server2 = net.createServer(socket => {
  server8010.push(socket);
  address(socket);
  socket.on('data', data => {
    broadcastServer2(data, socket);
  });
  socketing;
});

server2.listen(8010, () => {
  console.log(server2.address());
})

const broadcastServer2 = (msg, socketSent) => {
  if (msg.toString() === 'exit') {
    const index = server8010.indexOf(socketSent);
    server8010.splice(index, 1);
  } if (msg.toString() !== 'exit') {
    server8010.forEach(socket => {
      if (socket !== socketSent) socket.write(msg)
    })
  }
}