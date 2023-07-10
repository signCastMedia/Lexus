
const {Project} = require('./models/Project')

let io = require("socket.io")();
// let onlineUsers = [];

// Store the mapping of project IDs to socket IDs
const projectSocketsMap = {};
let currentProject = ''

// const addNewUser = (userId, socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
//   !onlineUsers.some((user) => user.userId === userId) &&
//     onlineUsers.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   const verifiedUser = onlineUsers.find((user) => user.userId === userId);
//   if (verifiedUser) {
//     return verifiedUser;
//   }
// };

io.on("connection", (socket) => {
  io.emit("connAcknowledge", socket.id);
  // console.log(onlineUsers,'connected')

  // socket.on("newUser", (userId) => {
  //   addNewUser(userId.Id, socket.id);
  // });

  socket.on('joinProject', (projectId) => {
    // Create a new group for the project if it doesn't exist
    if (!projectSocketsMap[projectId]) {
      projectSocketsMap[projectId] = [];
    }

    // Add the socket ID to the project's group
    projectSocketsMap[projectId].push(socket.id);

    console.log(`Socket ID ${socket.id} joined project ${projectId}`);
    console.log(projectSocketsMap,'full groups')
    // Emitting the message to multiple socket IDs

  

    try {
 Project.watch().on("change", (data) => projectSocketsMap[data.documentKey._id.toString()]? projectSocketsMap[data.documentKey._id.toString()].forEach(socketId => {
  io.to(socketId).emit('greet', 'returnMessage');
}):'doesnt exist');


//  Project.watch().on("change", (data) => getUser(data.documentKey._id.toString()).userId?io.to(getUser(data.documentKey._id.toString()).socketId).emit('greet','returnMessage'):'doesnt exist');

    
  } catch (err) {
    console.log(err);
  }



//     projectSocketsMap.forEach(socketId => {
//   io.to(socketId).emit('message', 'Hello, sockets!');
//   // Project.watch().on("change", (data) => getUser(data.documentKey._id.toString()).userId?io.to(getUser(data.documentKey._id.toString()).socketId).emit('greet','returnMessage'):'doesnt exist');
//   Project.watch().on("change", (data) => console.log(data));
// });
  
    })

  // io.of("/").adapter.on("create-room", (room) => {
  //   console.log(`room ${room} was created`);
  // });

  //   try {
  //   Project.watch().on("change", (data) => getUser(data.documentKey._id.toString()).userId?io.to(getUser(data.documentKey._id.toString()).socketId).emit('greet','returnMessage'):'doesnt exist');




    
  // } catch (err) {
  //   console.log(err);
  // }

  // try{
  //   const project = getUser()
  //   console.log('this is the current project',)
  // }catch(err){

  // }

  // socket.on("message", (data) => {
  //   const receiver = getUser(data.vendorId);
  //   const sender = getUser(data.userId);
  //   const senderSocket = onlineUsers.find((user) => user.userId === data.userId).socketId;
  //   if (!receiver) {io.to(senderSocket).emit("feedbackOffline", "User is offline");
  //   } else {
  //     const receiverSocket = onlineUsers.find(user => user.userId === receiver.userId).socketId;
  //     let returnMessage = {
  //       'user': data.name, 
  //       'userId': data.userId,
  //       'message': data.text, 
  //       'recipientId': data.vendorId}
  //     io.to(receiverSocket).emit('feedbackOnline', returnMessage);
  //   }
  // });
  socket.on('disconnect', () => {
    // console.log(`SocketID ${socket.id} disconnected`);
    // removeUser(socket.id);
    console.log('A user disconnected');

    // Remove the socket ID from all project groups
    for (const projectId in projectSocketsMap) {
      const socketIndex = projectSocketsMap[projectId].indexOf(socket.id);
      if (socketIndex !== -1) {
        projectSocketsMap[projectId].splice(socketIndex, 1);
        console.log(`Socket ID ${socket.id} left project ${projectId}`);
      }

      // Remove the project group if it becomes empty
      if (projectSocketsMap[projectId].length === 0) {
        delete projectSocketsMap[projectId];
      }
    }
  });

  // socket.on("disconnect", (socket) => {
  //   console.log(`SocketID ${socket.id} disconnected`);
  //   removeUser(socket.id);
  // });
});

module.exports = io;