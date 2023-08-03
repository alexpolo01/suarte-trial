function initArtworkFormState(artworkData, editMode, state) {
  if(editMode) {
    return {
      _id: artworkData._id,
      artwork_about: {
        ...artworkData.artwork_about,
        artwork_artist: artworkData.artwork_about.artwork_artist ? artworkData.artwork_about.artwork_artist : artworkData.artwork_about.artwork_gallery_artist
      },
      artwork_media: artworkData.artwork_media,
      artwork_shipping: artworkData.artwork_shipping
    };
  } else if(artworkData) {
    return {
      _id: artworkData._id,
      lastCompletedStep: artworkData.draft_container.lastCompletedStep,
      artwork_about: artworkData.draft_container.artwork_about,
      artwork_media: artworkData.draft_container.artwork_media,
      artwork_shipping: artworkData.draft_container.artwork_shipping,
    };
  } else {
    return {
      _id: null,
      lastCompletedStep: 0,
      artwork_about: {
        artwork_type: "Work of Artist",
        artwork_artist: null,
        artwork_title: "",
        artwork_description: "",
        artwork_medium: "",
        artwork_year: "",
        artwork_size: {
          unit: "cm",
          height: "",
          length: ""
        },
        artwork_theme: [],
        artwork_feeling: [],
        artwork_color: [],
        artwork_currency: "",
        artwork_price: "",
        artwork_limited_edition: false,
        artwork_includes_certificate: false,
        artwork_includes_frame: false
      },
      artwork_media: {
        artwork_main_picture: null,
        artwork_secondary_pictures: [],
        artwork_audio: null
      },
      artwork_shipping: {
        artwork_shipping_own: {
          payer: "The collector",
          currency: "",
          price: "",
          location: state.user_session.gallery_address.country 
        },
        artwork_shipping_rest: {
          payer: "The collector",
          currency: "",
          price: "",
        },
        artwork_shipping_exceptions: []
      }
    };
  }
}

function initPostFormState(postData) {
  if(postData) {
    return {
      _id: postData._id,
      post_cover: postData.post_container.post_cover,
      post_title: postData.post_container.post_title,
      post_main_text: postData.post_container.post_main_text,
      post_pictures: postData.post_container.post_pictures,
      post_tags: postData.post_container.post_tags,
    };
  } else {
    return {
      _id: null,
      post_cover: null,
      post_title: "",
      post_main_text: "",
      post_pictures: [],
      post_tags: []
    };
  }
}

function isPostMediaUploading(formState) {
  return (formState.post_cover?.loading === true) || (formState.post_pictures.some(postPicture => postPicture.loading === true));
}

function initShippingAddressForm(addressData) {
  if(addressData) {
    return addressData;
  } else {
    return {
      address_name: "",
      address_surname: "",
      address_street: "",
      address_city: "",
      address_zip_code: "",
      address_region: "",
      address_country: "",
      address_phone: {
        address_phone_prefix: "",
        address_phone_number: ""
      }
    };
  }
}

function initArtistForm(artistData) {
  if(artistData) {
    return {
      ...artistData,
      isArtistDeceased: Boolean(artistData.artist_death)
    };
  } else {
    return {
      artist_name: "",
      artist_email: "",
      artist_nationality: "",
      artist_birth: "",
      isArtistDeceased: false,
      artist_death: ""
    };
  }
}

const FormUtils = {
  initArtworkFormState,
  initPostFormState,
  isPostMediaUploading,
  initShippingAddressForm,
  initArtistForm
};

export default FormUtils;