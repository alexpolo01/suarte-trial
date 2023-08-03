import config from '@/config';
import useCache from '@/hooks/useCache';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import GalleryRequestCard from './components/GalleryRequestCard';

import './index.css';

export default function GalleryRequests() {
  const { loading, fetchData } = useCache("admin_gallery_requests", `${config.apis.api.url}/request/access/gallery?status=new`, {
    type: "@cache/dynamic", 
    injectToken: true, 
    invalidateWhen: ["GALLERY_REQUEST_ACCEPTED", "GALLERY_REQUEST_DENIED"]
  });

  if(loading) {
    return <Text className="admin-gallery-requests__loading-text" paragraph justify large>Cargando las solicitudes...</Text>;
  }

  return (
    <>
      <div className="admin-gallery-requests__container">
        <h2 className="admin-gallery-requests__heading"><Heading medium>Solicitudes de galerías</Heading></h2>
        {fetchData.data.map(galleryRequest => (
          <GalleryRequestCard key={galleryRequest._id} galleryInfo={galleryRequest}/>
        ))}
      </div>
    </>
  );
}
