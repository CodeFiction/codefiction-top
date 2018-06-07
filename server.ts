import { Datastructure } from './Datastructure/TopperStack';
import { Chat } from './Datastructure/Message';

/**
 * Created by ugur on 2016-12-26.
 */
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static('dist'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

let port = process.env.PORT || 4200;

server.listen(port);

let topperStack: Datastructure.IStackMap = {};
let totalToppers: number = 0;

function FindAddStack(room: string, currentStack): Datastructure.TopperStack {
  if (currentStack[room] instanceof Datastructure.TopperStack) {
  } else {
    currentStack[room] = new Datastructure.TopperStack([]);
  }
  return currentStack[room];
}

io.on('connection', function(client) {
  // Send current user list to current user only
  client.emit('update_toppers', totalToppers);

  client.on('addUser', function(data: Datastructure.ITopper) {
    data.id = client.id;
    let currentStack = FindAddStack(data.room, topperStack);
    let register_result = currentStack.push(data);
    // User does not exist in the current list
    if (register_result === -1) {
      client.join(data.room);
      client.emit('update_me', data);
      io.in(data.room).emit('update_toppers', currentStack);
      totalToppers++;
    } else {
      client.emit('register_failed', data);
    }
  });

  client.on('top_me', function(data: Datastructure.ITopper) {
    let currentStack = FindAddStack(data.room, topperStack);
    currentStack.topThat(data);
    io.in(data.room).emit('update_toppers', currentStack);
  });

  client.on('message', function(data: Chat.Message) {
    if (data.message) {
      data.date = new Date();
      io.in(data.room).emit('message', data);
    }
  });

  // Todo: How to handle disconnection
  // client.on('disconnect', function(data: Datastructure.ITopper){
  //     console.log("disconnected");
  //     console.log(data);
  //     topperStack.remove(data);
  //     io.emit('update_toppers', topperStack);
  // });
});
