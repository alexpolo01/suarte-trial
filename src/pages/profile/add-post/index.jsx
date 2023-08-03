import { useLocation } from 'react-router-dom';

import AddPostForm from '@/shared-components/forms/add-post';

export default function AddPost() {
  const location = useLocation();

  return (
    <>
      <AddPostForm postData={location.state?.draftData}/>
    </>
  );
}
