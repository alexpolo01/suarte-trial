import config from '@/config';
import fetchWrapper from '@/services/fetchWrapper.service';

function updateArtworksOrder(data, id) {
  return fetchWrapper.put(`${config.apis.api.url}/internalcollection/updateartworksorder/${id}`, {
    injectToken: true,
    body: data
  });
}
function updateCollectionsOrder(data, is_mobile) {
  return fetchWrapper.put(`${config.apis.api.url}/internalcollection/updateorder/${is_mobile}`, {
    injectToken: true,
    body: data
  });
}

const InternalCollectionService = {
  updateArtworksOrder,
  updateCollectionsOrder
};

export default InternalCollectionService;