import { useState } from "react";

import config from "@/config";
import useCache from "@/hooks/useCache";
import UserService from "@/services/user.service";
import ContinueButton from "@/shared-components/buttons/components/ContinueButton";
import FormError from "@/shared-components/error/components/FormError";
import AddShippingAddress from "@/shared-components/forms/components/AddShippingAddress";
import ThumbIcon from "@/shared-components/icons/components/artwork/ThumbIcon";
import CustomSpinner from "@/shared-components/loaders/components/CustomSpinner";

import PersonalizedMessage from "./components/PersonalizedMessage";
import ShippingCard from "./components/ShippingCard";
import Reviews from "./reviews";

import "./index.css";

export default function ShippingDetails({
  artworkData,
  formState,
  setFormState,
  typeOfPurchase,
}) {
  const { loading, fetchData, setFetchData } = useCache(
    `artwork_${artworkData._id}_payment_details_${typeOfPurchase}`,
    `${config.apis.api.url}/payment/${artworkData._id}`,
    {
      injectToken: true,
      expiresIn: ["2", "minutes"],
      includeSearchQueries: { type: typeOfPurchase },
    }
  );
  const [openAddAddressForm, setOpenAddAddressForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [openReviews, setOpenReviews] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  function addShippingAddress(newAddressData) {
    setFetchData({
      ...fetchData,
      user_addresses: [...fetchData.user_addresses, newAddressData],
    });
  }

  function editShippingAddress(newAddressData) {
    setFetchData({
      ...fetchData,
      user_addresses: fetchData.user_addresses.map((address) => {
        if (address._id === newAddressData._id) {
          return newAddressData;
        } else {
          return address;
        }
      }),
    });

    if (formState.shipping_details?._id === newAddressData._id) {
      setFormState({
        ...formState,
        shipping_details: newAddressData,
      });
    }
  }

  async function continueToCheckout() {
    setFormLoading(true);

    const { response, data } = await UserService.createCheckoutSession(
      artworkData._id,
      formState,
      typeOfPurchase
    );

    if (response.ok) {
      window.location = data;
    } else if (response.status === 400) {
      setFormLoading(false);
      setFormError({ element: "purchase_error", error_code: data.error_type });
    }
  }

  return (
    <>
      <div className="purchase-shipping-details__container">
        {loading ? (
          <CustomSpinner className="purchase-shipping-details__spinner" thin />
        ) : openReviews ? (
          <Reviews
            purchaseFetchData={fetchData}
            artworkData={artworkData}
            typeOfPurchase={typeOfPurchase}
            close={() => setOpenReviews(false)}
          />
        ) : (
          <>
            <div className="purchase-shipping-details__shipped-by-container">
              <span className="purchase-shipping-details__shipped-by dots-on-overflow mt-s">
                Shipped by{" "}
                <span>
                  {typeOfPurchase === "limited_edition"
                    ? "Suarte"
                    : artworkData.artwork_about.artwork_gallery.user_name}
                </span>
              </span>

              <span
                className="purchase-shipping-details__add-adress element-non-selectable mt-s"
                onClick={() => setOpenAddAddressForm(true)}
              >
                Add shipping address
              </span>
            </div>

            {fetchData.valorations.total !== 0 && (
              <div className="purchase-shipping-details__reviews-details">
                <ThumbIcon className="purchase-shipping-details__thumb-icon" />

                <span className="purchase-shipping-details__shipped-by mt-s">
                  {fetchData.valorations.average}%
                </span>

                <span
                  className="purchase-shipping-details__add-adress element-non-selectable mt-s"
                  onClick={() => setOpenReviews(true)}
                >
                  {fetchData.valorations.total} reviews
                </span>
              </div>
            )}

            {fetchData.user_addresses.length === 0 ? (
              <p className="purchase-shipping-details__empty-text mt-s">
                Please add a shipping address by clicking on the "Add shipping
                address" button above.
              </p>
            ) : (
              fetchData.user_addresses.map((address) => (
                <ShippingCard
                  key={address._id}
                  data={address}
                  isSelected={formState.shipping_details?._id === address._id}
                  selectShipping={() =>
                    setFormState({ ...formState, shipping_details: address })
                  }
                  setAddressToEdit={setAddressToEdit}
                />
              ))
            )}

            <PersonalizedMessage
              formState={formState}
              setFormState={setFormState}
              typeOfPurchase={typeOfPurchase}
              artworkData={artworkData}
            />

            <input type="hidden" id="purchase_error" />
            <FormError element="purchase_error" error={formError} />

            <div
              className="purchase-limited-editions-info__container element-non-selectable"
              style={{ marginTop: "1rem" }}
            >
              <span
                className="purchase-limited-editions-info__heading mt-l"
                style={{ marginBottom: "0px" }}
              >
                Shipping details
              </span>
            </div>

            <ul className="purchase-limited-editions-info__ul">
              <li className="purchase-limited-edition-info__li mt-s">
                ● Ready to dispatch in <span>5 business days</span>
              </li>

              <li className="purchase-limited-edition-info__li mt-s">
                ● Delivered from <span>Spain</span>
              </li>
            </ul>

            <ContinueButton
              loading={formLoading}
              turnOff={!formState.shipping_details}
              className="purchase-shipping-details__submit mt-m"
              onClick={continueToCheckout}
            >
              Continue to checkout
            </ContinueButton>

            <AddShippingAddress
              open={openAddAddressForm}
              close={() => setOpenAddAddressForm(false)}
              onAdd={addShippingAddress}
            />

            <AddShippingAddress
              open={Boolean(addressToEdit)}
              close={() => setAddressToEdit(null)}
              addressData={addressToEdit}
              onAdd={editShippingAddress}
              editMode
            />
          </>
        )}
      </div>
    </>
  );
}
