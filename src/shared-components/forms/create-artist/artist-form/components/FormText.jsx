import Text from '@/shared-components/text/components/Text';

import './styles/FormText.css';

export default function FormText({ formState, createMode }) {
  if(createMode === "Work of Artist") {
    return (
      <Text className="artist-form__form-text" paragraph justify small>
                For artworks classified as 'Work of Artist,' providing 
                the Artist's email is required. If the artist is deceased, 
                provide the legal representative's email address.
      </Text>
    );
  } else if(formState.isArtistDeceased) {
    return (
      <Text className="artist-form__form-text" paragraph justify small>
                If the artist is deceased and you provide the legal representative's email address, 
                they will be able to claim the Artist's profile but won't have access to insights or sales notifications.
      </Text>
    );
  } else {
    return (
      <Text className="artist-form__form-text" paragraph justify small>
                For Gallery Owned artworks, it's optional to provide the Artist's email. 
                If given, the Artist will be invited to join as an Artist, but won't 
                have access to insights or sales notifications. 
      </Text>
    );
  }
}
