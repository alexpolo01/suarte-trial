import config from '@/config';
import fetchWrapper from '@/services/fetchWrapper.service';

function updateArtworksOrder(data, id) {
  return fetchWrapper.put(`${config.apis.api.url}/internalcollection/updateorder/${id}`, {
    injectToken: true,
    body: data
  });
}

const InternalCollectionService = {
  updateArtworksOrder,
};

export default InternalCollectionService;