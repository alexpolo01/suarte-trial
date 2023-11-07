import config from '@/config';
import fetchWrapper from '@/services/fetchWrapper.service';
import { loginWithCustomToken, logoutUser } from '@/services/firebase.service';
import SocketService from '@/services/socket.service';
import Utils from '@/utils';

function login(email, password) {
  return fetchWrapper.post(`${config.apis.api.url}/login/custom`, {
    body: {
      user_email: email,
      user_password: password
    }
  });
}

function logout() {
  logoutUser();
}

function registerCollector(email, password, invite) {
  return fetchWrapper.post(`${config.apis.api.url}/register`, {
    body: {
      user_email: email,
      user_password: password,
      user_type: "collector",
      invite
    }
  });
}

function requestResetPassword(email) {
  return fetchWrapper.post(`${config.apis.api.url}/forgot-password`, {
    body: {
      user_email: email
    }
  });
}

function resetPassword(password, oobCode) {
  return fetchWrapper.post(`${config.apis.api.url}/reset-password`, {
    body: {
      user_password: password,
      oobCode: oobCode
    }
  });
}

function getCustomToken(firebaseAccessToken, invite) {
  return fetchWrapper.post(`${config.apis.api.url}/login/google`, {
    body: {
      access_token: firebaseAccessToken,
      invite
    }
  });
}

function registerGallery(galleryData) {
  return fetchWrapper.post(`${config.apis.api.url}/request/access/gallery`, {
    body: {
      user_name: galleryData.user_name.value,
      user_username: galleryData.user_username.value,
      user_email: galleryData.user_email.value,
      gallery_business_id: galleryData.gallery_business_id.value,
      gallery_address: {
        street: galleryData["gallery_address.street"].value,
        city: galleryData["gallery_address.city"].value,
        zip_code: galleryData["gallery_address.zip_code"].value, 
        region: galleryData["gallery_address.region"].value,
        country: galleryData["gallery_address.country"].value
      },
      user_password: galleryData.user_password.value,
      gallery_agent: {
        agent_name: galleryData["gallery_agent.agent_name"].value,
        agent_gender: galleryData["gallery_agent.agent_gender"].value,
        agent_birth: Utils.getYearObjectFromInput(galleryData["gallery_agent.agent_birth"].value),
        agent_phone: {
          phone_prefix: galleryData["gallery_agent.agent_phone.phone_prefix"].value,
          phone_number: galleryData["gallery_agent.agent_phone.phone_number"].value,
        }
      },
      gallery_comment: galleryData.gallery_comment.value,
    }
  });
}

function claimArtistProfile(email) {
  return fetchWrapper.post(`${config.apis.api.url}/request/access/artist`, {
    body: {
      user_email: email
    }
  });
}

function resendArtistCode(oobCode) {
  return fetchWrapper.post(`${config.apis.api.url}/request/access/artist/resend`, {
    body: {
      oobCode: oobCode
    }
  });
}

function verifyArtistCode(code, oobCode) {
  return fetchWrapper.post(`${config.apis.api.url}/request/access/artist/verify`, {
    body: {
      code: code,
      oobCode: oobCode
    }
  });
}

function registerArtist(oobCode, password, invite) {
  return fetchWrapper.post(`${config.apis.api.url}/request/access/artist/confirm`, {
    body: {
      oobCode: oobCode,
      user_password: password,
      invite
    }
  });
}

async function initUserSession(stateHandler, setLoading, data) {
  const user_name = data.user_session.user_username;
  const user_email = data.user_session.user_email;

  const sendData = {
    username: user_name,
    usermail: user_email,
  };
  SocketService.setUserInfo(sendData);

  const message = {
    prefix: "Login",
  };
  SocketService.sendMessage(message);
  await loginWithCustomToken(data.custom_token);
  stateHandler.set("user_session", data.user_session);
  if(setLoading) setLoading(false);
}

const AuthService = {
  login,
  logout,
  registerCollector,
  requestResetPassword,
  resetPassword,
  getCustomToken,
  registerGallery,
  claimArtistProfile,
  resendArtistCode,
  verifyArtistCode,
  registerArtist,
  initUserSession
};

export default AuthService;
