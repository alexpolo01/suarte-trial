import config from '@/config';
import fetchWrapper from '@/services/fetchWrapper.service';

function acceptGalleryRequest(requestId) {
  return fetchWrapper.post(`${config.apis.api.url}/request/access/gallery/accept/${requestId}`, {
    injectToken: true
  });
}

function denyGalleryRequest(requestId, reason) {
  return fetchWrapper.post(`${config.apis.api.url}/request/access/gallery/reject/${requestId}`, {
    injectToken: true,
    body: {
      reason
    }
  });
}

function acceptArtworkRequest(requestId) {
  return fetchWrapper.post(`${config.apis.api.url}/draft/approve/${requestId}`, {
    injectToken: true,
  });
}

function rejectArtworkRequestAndNotifyChanges(requestId, draftChanges) {
  return fetchWrapper.post(`${config.apis.api.url}/draft/reject/${requestId}`, {
    injectToken: true,
    body: {
      draft_changes: draftChanges
    }
  });
}

function acceptLimitedEditionRequest(requestId) {
  return fetchWrapper.post(`${config.apis.api.url}/inventory/limited-editions/${requestId}/approve`, {
    injectToken: true,
  });
}

function rejectLimitedEditionRequestAndNotifyChanges(requestId, reason) {
  return fetchWrapper.post(`${config.apis.api.url}/inventory/limited-editions/${requestId}/reject`, {
    injectToken: true,
    body: {
      reason
    }
  });
}

const AdminService = {
  acceptGalleryRequest,
  denyGalleryRequest,
  acceptArtworkRequest,
  rejectArtworkRequestAndNotifyChanges,
  acceptLimitedEditionRequest,
  rejectLimitedEditionRequestAndNotifyChanges
};

export default AdminService;