import { Navigate,useLocation } from 'react-router-dom';

import AddPostForm from '@/shared-components/forms/add-post';

export default function EditPost() {
  const location = useLocation();

  if(!location.state?.postData) {
    return <Navigate to="/profile/board" replace/>;
  } else {
    return (
      <>
        <AddPostForm postData={location.state?.postData} editMode/>
      </>
    );
  }
}
