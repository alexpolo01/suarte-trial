import config from '@/config';
import fetchWrapper from '@/services/fetchWrapper.service';

function removeArtworkDraft(draftId) {
  return fetchWrapper.delete(`${config.apis.api.url}/draft/${draftId}`, {
    injectToken: true,
  });
}

function saveArtworkDraft(formState, validationOptions) {
  const draftData = {
    artwork_about: formState.artwork_about,
    artwork_media: formState.artwork_media,
    artwork_shipping: formState.artwork_shipping,
    lastCompletedStep: validationOptions ? formState.lastCompletedStep + 1 : formState.lastCompletedStep,
    validation: validationOptions
  };

  if(formState._id) {
    return fetchWrapper.put(`${config.apis.api.url}/draft/${formState._id}`, {
      injectToken: true,
      body: { draft_container: draftData }
    });
  } else {
    return fetchWrapper.post(`${config.apis.api.url}/draft`, {
      injectToken: true,
      body: { draft_container: draftData }
    });
  }
}

function editArtwork(formState) {
  return fetchWrapper.put(`${config.apis.api.url}/artwork/${formState._id}`, {
    injectToken: true,
    body: {
      draft_container: {
        ...formState,
        validation: { about: true, media: true, shipping: true }
      }
    }
  });
}

function updateGalleryShippings(newGalleryShippings) {
  return fetchWrapper.put(`${config.apis.api.url}/gallery/shipping`, {
    injectToken: true,
    body: {
      gallery_shippings: newGalleryShippings
    }
  });
}

function createArtistProfile(newArtistData, createMode) {
  return fetchWrapper.post(`${config.apis.api.url}/galleryartist`, {
    injectToken: true,
    body: {
      ...newArtistData,
      type: createMode
    }
  });
}

function editArtistProfile(newArtistData) {
  return fetchWrapper.put(`${config.apis.api.url}/galleryartist/${newArtistData._id}`, {
    injectToken: true,
    body: newArtistData
  });
}

function completeArtistProfile(newEmail, artistData) {
  return fetchWrapper.put(`${config.apis.api.url}/galleryartist/${artistData._id}/complete`, {
    injectToken: true,
    body: {
      ...artistData,
      artist_email: newEmail
    }
  });
}

function completeOnboarding() {
  return fetchWrapper.put(`${config.apis.api.url}/gallery/onboarding/complete`, {
    injectToken: true,
  });
}

function removePostDraft(draftId) {
  return fetchWrapper.delete(`${config.apis.api.url}/post/${draftId}`, {
    injectToken: true,
  });
}

function editGalleryAgent(newGalleryAgent) {
  return fetchWrapper.put(`${config.apis.api.url}/gallery/info`, {
    injectToken: true,
    body: {
      gallery_agent: newGalleryAgent
    }
  });
}

function updateBankAccount(newBankAccount) {
  return fetchWrapper.put(`${config.apis.api.url}/gallery/bank`, {
    injectToken: true,
    body: newBankAccount
  });
}

function updateClosedMode(closed, reason) {
  return fetchWrapper.put(`${config.apis.api.url}/gallery/closed`, {
    injectToken: true,
    body: {
      closed,
      reason
    }
  });
}

function submitPost(postData, validation=false) {
  if(postData._id) {
    return fetchWrapper.put(`${config.apis.api.url}/post/${postData._id}`, {
      injectToken: true,
      body: {
        post_container: postData,
        validation
      }
    });
  } else {
    return fetchWrapper.post(`${config.apis.api.url}/post`, {
      injectToken: true,
      body: {
        post_container: postData,
        validation
      }
    });
  }
}

function markArtworkAsSold(artworkId, collectorEmail) {
  return fetchWrapper.post(`${config.apis.api.url}/mark-as-sold/${artworkId}`, {
    injectToken: true,
    body: {
      user_email: collectorEmail
    }
  });
}

function requestLimitedEditions(artworkId) {
  return fetchWrapper.post(`${config.apis.api.url}/inventory/limited-editions/${artworkId}/request`, {
    injectToken: true,
  });
}

function changeRenewalOfContract(artworkId, isAutomatic) {
  fetchWrapper.post(`${config.apis.api.url}/inventory/automatic-renewal/${artworkId}`, {
    injectToken: true,
    body: {
      is_automatic: isAutomatic
    }
  });
}

function withdrawArtwork(artworkId) {
  return fetchWrapper.post(`${config.apis.api.url}/inventory/withdraw/${artworkId}`, {
    injectToken: true,
  });
}

function submitShippingDetails(orderNumber, shippingDetails) {
  return fetchWrapper.put(`${config.apis.api.url}/order/${orderNumber}/tracking`, {
    injectToken: true,
    body: shippingDetails
  });
}

const GalleryService = {
  removeArtworkDraft,
  saveArtworkDraft,
  editArtwork,
  updateGalleryShippings,
  createArtistProfile,
  completeArtistProfile,
  editArtistProfile,
  completeOnboarding,
  removePostDraft,
  editGalleryAgent,
  updateBankAccount,
  updateClosedMode,
  submitPost,
  markArtworkAsSold,
  requestLimitedEditions,
  changeRenewalOfContract,
  withdrawArtwork,
  submitShippingDetails
};

export default GalleryService;