import Notifier from "react-desktop-notification";

import config from "@/config";

import { actions } from "./constantInteraction";
import { midfix, prefix, suffix } from "./constantSuarte";

const io = require('socket.io-client');

let socket;

function init () {
  socket = io(config.apis.api.url);
  socket.on('message', function(data) {
    console.log(data);
    if (data.prefix == "NewLogin") {
      if (data.username !== undefined) {
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
        message += data.subject + actions[data.status] + data.object + data.result + data.period;
      }

      gotNewNotification({
        type: "NotificationData1",
        title: "",
        content: message,
      });
    }
  });
}

function gotNewNotification(data) {
  Notifier.focus(data.title, data.content, "localhost:3001", "");
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