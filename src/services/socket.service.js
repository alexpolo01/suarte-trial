import Notifier from "react-desktop-notification";
import { midfix, prefix, suffix } from "./constantSuarte";

const io = require('socket.io-client');

let socket;

function init () {
  console.log("SOCKET!!!!!!!!!!!!!!!");
  socket = io("http://localhost:8000");

  socket.on('message', function(data) {
    console.log(data);
    if (data.prefix == "NewLogin") {
      if (data.username !== undefined) {
        // console.log("New member " + data.username + " Joined!");
        gotNewNotification({
          type: "NewLogin",
          title: "Ally Signin",
          content: "Ally " + data.username + " Joined!",
        });
      }
    }
    else if (data.prefix == "NotificationData") {
      let message = "";
      if (data.type) {
        message += prefix[data.status] + data.subject + midfix[data.status] + data.object + suffix[data.status] + data.result;
      }
      else {

      }

      gotNewNotification({
        type: "NotificationData1",
        title: "",
        content: message,
      });
    }
  });

  Notifier.start("New", "Here is context", "localhost:3001", "https://logowik.com/content/uploads/images/upwork-icon.jpg");
}

function gotNewNotification(data) {
  Notifier.focus(data.title, data.content, "localhost:3001", "https://logowik.com/content/uploads/images/upwork-icon.jpg");
}

function sendMessage(data) {
  socket.emit('sendMessage', data);
}

function setUserInfo(data) {
  socket.emit('setUserInfo', data);
}

const SocketService =  {
  init,
  sendMessage,
  setUserInfo,
};

export default SocketService;