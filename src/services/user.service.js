import axios from 'axios';

import config from '@/config';
import fetchWrapper from '@/services/fetchWrapper.service';

function contact(contactData, type) {
  return fetchWrapper.post(`${config.apis.api.url}/contact`, {
    body: {
      contact_name: contactData.contact_name.value,
      contact_email: contactData.contact_email.value,
      contact_message: contactData.contact_message.value,
      contact_type_user: type
    }
  });
}

function getUserSession() {
  return fetchWrapper.get(`${config.apis.api.url}/user/me`, {
    injectToken: true
  });
}

function createAccountAndCompleteOnboarding(accountData, user_type) {
  return fetchWrapper.put(`${config.apis.api.url}/${user_type}/onboarding/complete`, {
    body: accountData,
    injectToken: true
  });
}

function updateUserFlags(user_type, flags) {
  return fetchWrapper.put(`${config.apis.api.url}/${user_type}`, {
    body: flags,
    injectToken: true
  });
}

function updateUserPreferences(preferences) {
  return fetchWrapper.put(`${config.apis.api.url}/user/me`, {
    body: preferences,
    injectToken: true
  });
}

function uploadImage(image, onProgress) {
  return new Promise(resolve => {
    try {
      const imageURL = URL.createObjectURL(image);
      const imageElement = new Image();
          
      imageElement.onload = async function () {
        const imageWidth = this.width;
        const imageHeight = this.height;

        URL.revokeObjectURL(imageURL);
        
        const { response, data } = await fetchWrapper.post(`${config.apis.api.url}/image/direct-upload`, {
          injectToken: true
        });
            
        if(response.ok) {
          let bodyForCloudflare = new FormData();

          bodyForCloudflare.append("file", image);

          const cloudflareResponse = await axios({
            method: "post",
            url: data.result.uploadURL,
            data: bodyForCloudflare,
            onUploadProgress: (progressEvent) => {
              if(onProgress) {
                onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
              }
            }
          });

          if(cloudflareResponse.data.success) {
            resolve({
              response: { ok: true }, 
              data: {
                image_id: cloudflareResponse.data.result.id,
                image_original_data: {
                  width: imageWidth,
                  height: imageHeight,
                  aspect_ratio: imageWidth / imageHeight,
                  name: image.name
                }
              }
            });
          } else {
            throw new Error("Cloudflare upload failed");
          }
        } else {
          throw new Error("Upload URL request failed");
        }
      };
    
      imageElement.src = imageURL;  
    } catch(err) {
      resolve({ response: { ok: false }, data: null });
    }
  });
}

function uploadAudio(audio, onProgress) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    try {
      const { response, data } = await fetchWrapper.post(`${config.apis.api.url}/audio/direct-upload`, {
        injectToken: true,
      });
        
      if(response.ok) {
        const cloudflareResponse = await axios({
          method: "put",
          url: data.url,
          data: audio,
          onUploadProgress: (progressEvent) => {
            if(onProgress) {
              onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
          }
        });
    
        if(cloudflareResponse.status === 200) {
          resolve({
            response: { ok: true }, 
            data: {
              audio_id: data.id
            }
          });
        } else {
          throw new Error("Cloudflare upload failed");
        }
      } else {
        throw new Error("Upload URL request failed");
      }
    } catch(err) {
      resolve({ response: { ok: false }, data: null });
    }
  });
}

function followUser(userId) {
  fetchWrapper.post(`${config.apis.api.url}/user/follow`, {
    injectToken: true,
    body: {
      followee_id: userId
    },
  });
}

function unfollowUser(userId) {
  fetchWrapper.post(`${config.apis.api.url}/user/unfollow`, {
    injectToken: true,
    body: {
      followee_id: userId
    },
  });
}

function createArtlist(newArtlist) {
  return fetchWrapper.post(`${config.apis.api.url}/artlist`, {
    injectToken: true,
    body: newArtlist,
  });
}

function editProfile(newProfileData) {
  return fetchWrapper.put(`${config.apis.api.url}/user/profile`, {
    injectToken: true,
    body: newProfileData,
  });
}

function changePassword(newPasswordData) {
  return fetchWrapper.put(`${config.apis.api.url}/user/password`, {
    injectToken: true,
    body: newPasswordData,
  });
}

function editArtlist(newArtlistData) {
  return fetchWrapper.put(`${config.apis.api.url}/artlist/${newArtlistData._id}`, {
    injectToken: true,
    body: {
      ...newArtlistData,
      artlist_artworks: newArtlistData.artlist_artworks.map(artwork => artwork._id)
    }
  });
}

function deleteArtlist(artlistId) {
  return fetchWrapper.delete(`${config.apis.api.url}/artlist/${artlistId}`, {
    injectToken: true,
  });
}

function addShippingAddress(addressData) {
  return fetchWrapper.post(`${config.apis.api.url}/address`, {
    injectToken: true,
    body: addressData,
  });
}

function editShippingAddress(addressData) {
  return fetchWrapper.put(`${config.apis.api.url}/address/${addressData._id}`, {
    injectToken: true,
    body: addressData,
  });
}

function deleteShippingAddress(addressData) {
  return fetchWrapper.delete(`${config.apis.api.url}/address/${addressData._id}`, {
    injectToken: true,
    body: addressData,
  });
}

function editProduct(newProductData) {
  return fetchWrapper.put(`${config.apis.api.url}/product/${newProductData.product_id}`, {
    injectToken: true,
    body: newProductData,
  });
}

function likeItem(typeOfItem, itemId) {
  fetchWrapper.post(`${config.apis.api.url}/${typeOfItem.toLowerCase()}/like/${itemId}`, {
    injectToken: true,
  });
}

function unlikeItem(typeOfItem, itemId) {
  fetchWrapper.post(`${config.apis.api.url}/${typeOfItem.toLowerCase()}/unlike/${itemId}`, {
    injectToken: true,
  });
}

function saveItem(typeOfItem, itemId) {
  fetchWrapper.post(`${config.apis.api.url}/${typeOfItem.toLowerCase()}/save/${itemId}`, {
    injectToken: true,
  });
}

function unsaveItem(typeOfItem, itemId) {
  fetchWrapper.post(`${config.apis.api.url}/${typeOfItem.toLowerCase()}/unsave/${itemId}`, {
    injectToken: true,
  });
}

function addArtworkToArtlist(artwork, artlistId) {
  return fetchWrapper.put(`${config.apis.api.url}/artlist/${artlistId}`, {
    injectToken: true,
    body: {
      artworks_add: [artwork]
    }
  });
}

function removeArtworkFromArtlist(artwork, artlistId) {
  return fetchWrapper.put(`${config.apis.api.url}/artlist/${artlistId}`, {
    injectToken: true,
    body: {
      artworks_remove: [artwork]
    }
  });
}

function submitRating(artworkId, myRating) {
  return fetchWrapper.post(`${config.apis.api.url}/rating/${artworkId}`, {
    injectToken: true,
    body: myRating,
  });
}

function publishThought(artworkId, message, parentId) {
  return fetchWrapper.post(`${config.apis.api.url}/thought/${artworkId}`, {
    injectToken: true,
    body: {
      thought_message: message,
      thought_parent: parentId
    },
  });
}

function createCheckoutSession(artworkId, purchaseData, typeOfPurchase) {
  return fetchWrapper.post(`${config.apis.api.url}/payment/new`, {
    injectToken: true,
    body: {
      ...purchaseData,
      artwork_id: artworkId,
      type_of_purchase: typeOfPurchase
    },
  });
}

function submitReview(galleryId, reviewData) {
  return fetchWrapper.post(`${config.apis.api.url}/review`, {
    injectToken: true,
    body: {
      gallery_id: galleryId,
      ...reviewData
    },
  });
}

function confirmReception(orderNumber) {
  return fetchWrapper.put(`${config.apis.api.url}/order/${orderNumber}/confirm-reception`, {
    injectToken: true,
  });
}

function reportIssue(orderId, issueData) {
  return fetchWrapper.post(`${config.apis.api.url}/issue/new/${orderId}`, {
    injectToken: true,
    body: issueData
  });
}

function resolveIssue(orderId) {
  return fetchWrapper.post(`${config.apis.api.url}/issue/close/${orderId}`, {
    injectToken: true,
  });
}

function sendMessage(conversationId, messageText) {
  return fetchWrapper.post(`${config.apis.api.url}/order/${conversationId}/chat`, {
    injectToken: true,
    body: {
      message_text: messageText
    }
  });
}

function claimArtwork(claimCode) {
  return fetchWrapper.post(`${config.apis.api.url}/claim`, {
    injectToken: true,
    body: {
      claim_code: claimCode
    }
  });
}

function notifyWhenGalleryOpens(artworkId, collectorEmail) {
  return fetchWrapper.post(`${config.apis.api.url}/artwork/${artworkId}/notify-me`, {
    injectToken: true,
    body: {
      user_email: collectorEmail
    }
  });
}

const UserService = {
  contact,
  getUserSession,
  createAccountAndCompleteOnboarding,
  updateUserFlags,
  updateUserPreferences,
  uploadImage,
  uploadAudio,
  followUser,
  unfollowUser,
  createArtlist,
  editProfile,
  changePassword,
  editArtlist,
  deleteArtlist,
  addShippingAddress,
  editShippingAddress,
  deleteShippingAddress,
  editProduct,
  likeItem,
  unlikeItem,
  saveItem,
  unsaveItem,
  addArtworkToArtlist,
  removeArtworkFromArtlist,
  submitRating,
  publishThought,
  createCheckoutSession,
  submitReview,
  confirmReception,
  reportIssue,
  resolveIssue,
  sendMessage,
  claimArtwork,
  notifyWhenGalleryOpens
};

export default UserService;