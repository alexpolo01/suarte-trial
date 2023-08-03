import { useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetSearchParams from '@/hooks/useGetSearchParams';
import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';

import './index.css';

export default function GuidelinesUploadArtworks() {
  const [params] = useGetSearchParams();
  const aboutSection = useRef();
  const mediaSection = useRef();
  const shippingSection = useRef();
  const goBackHandler = useGoBack("/");
  const navigate = useNavigate();

  useEffect(()=> {
    if(params?.section === "about") {
      aboutSection.current.scrollIntoView(true);
    } else if(params?.section === "media") {
      mediaSection.current.scrollIntoView(true);
    } else if(params?.section === "shipping") {
      shippingSection.current.scrollIntoView(true);
    }
  }, []);
    
  return (
    <>
      <div className="guidelines-upload-artworks__container">
        <div className="guidelines-upload-artworks__wrap">
          <div className="guidelines-upload-artworks__header">
            <BackArrowIcon className="guidelines-upload-artworks__back-button" onClick={goBackHandler}/>
            <SuarteName className="guidelines-upload-artworks__suarte-name"/>
          </div>

          <h1 className="guidelines-upload-artworks__mini-heading margin">Guidelines to uploading artworks</h1>
          <p className="guidelines-upload-artworks__text no-margin"
          >Suarte efforts are focused on finding the ideal collector and building a 
                        community around each piece. For these reasons, all artworks uploaded 
                        must adhere to the following guidelines and quality standards:
          </p>

          <div className="guidelines-upload-artworks__separator"/>

          {/* ABOUT SECTION */}
          <h2 className="guidelines-upload-artworks__heading" id="about" ref={aboutSection}>1. About the artwork</h2>

          <p className="guidelines-upload-artworks__text margin">
                        Provide accurate and detailed information about the artwork.
          </p>

          <div className="guidelines-upload-artworks__section">
            <h3 className="guidelines-upload-artworks__sub-heading">1.1. Inventory Status</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Indicate whether the artwork is property of the Artist or fully owned by the Gallery.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.2. Artist</h3>
            <p className="guidelines-upload-artworks__text margin">
                            To add an artist to Suarte, search for their name and select it. If the artist is not yet listed, 
                            add them by providing their name, email, and nationality. This allows the artist to claim their profile later.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.3. Title</h3>
            <p className="guidelines-upload-artworks__text margin">
                            We recommend choosing a descriptive title for the artwork, as this can have a significant 
                            impact on its visibility. Avoid using "Untitled" unless it's necessary.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.4. Description</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Compose a captivating description that helps collectors engage with the artwork. 
                            Consider including details about the piece's inspiration, significance, and creation process can be enlightening. 
                            Third-person narratives often sound more authoritative.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.5. Medium/Materials</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Specify the mediums/materials used in creating the artwork. Feel free to 
                            include more details in the description. 
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.6. Themes, feelings and colors</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Identify themes, emotions, and colors to enhance the algorithm's ability to match the artwork with interested collectors.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.7. Year of creation</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Include the year or time frame (e.g., 2021-2023) of the artwork's creation.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.8. Dimensions</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Provide accurate dimensions of the artwork in centimeters or inches, excluding any framing dimensions. 
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.9. Price</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Provide the artwork's price. The gallery may adjust the price twice as per the artwork agreement. 
                            However, the new price cannot be lower than 30% of the uploading price.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">1.10. Limited Editions</h3>
            <p className="guidelines-upload-artworks__text no-margin">
                            Consider activating limited editions to expand your audience and generate passive income. 
                            Suarte evaluates the artwork's characteristics and pictures once a request is made to determine the viability of producing Limited Edition prints. 
                            They are an excellent and affordable option for art lovers looking to begin their collection. 
                            For more details, visit <span onClick={()=>navigate("/limited-edition-policies", { state: { from: true } })}>Suarte Limited Editions</span>.
            </p>
          </div>

          <div className="guidelines-upload-artworks__separator"/>

          {/* MEDIA SECTION */}
          <h2 className="guidelines-upload-artworks__heading" id="media" ref={mediaSection}>2. Media</h2>
          <p className="guidelines-upload-artworks__text margin">Since people cannot view the product in person, good photography is an important component of online marketing. It is essential that the photos capture everything about it, including the colors, size, and texture.</p>

          <h2 className="guidelines-upload-artworks__mini-heading">Tips for photographing artworks</h2>
          <ul>
            <li className="guidelines-upload-artworks__text">If you have a framed artwork behind glass that has to be photographed, to avoid reflections, take the main picture before framing or remove the glass and put it back after you're finished.  </li>
            <li className="guidelines-upload-artworks__text">Take the photos in the same area and, if possible, at the same time of day to achieve consistency. It will also make editing easier.</li>
            <li className="guidelines-upload-artworks__text">When photographing, avoid using glossy surfaces around the artwork to avoid unwanted reflections in the shot.</li>
            <li className="guidelines-upload-artworks__text">Avoid including other objects</li>
          </ul>
                
          <p className="guidelines-upload-artworks__text margin">The failure to submit a high-quality photograph is one of the main reasons why works are rejected. If that happends, it will be marked as "Changes required".</p>

          <div className="guidelines-upload-artworks__section">
            <h3 className="guidelines-upload-artworks__sub-heading">2.1. Main picture</h3>
            <p className="guidelines-upload-artworks__text margin">For paintings, the minimum requirement is one main picture of the entire artwork, without any spaces behind it and in its original format.</p>

            <h3 className="guidelines-upload-artworks__sub-heading">2.2. Secondary pictures</h3>
            <p className="guidelines-upload-artworks__text margin">
                            Include at least two additional images to offer a comprehensive view of the artwork. 
                            These could be close-ups of specific details or alternate perspectives. 
                            If the frame is included, add a picture with it.
            </p>

            <h3 className="guidelines-upload-artworks__sub-heading">2.3. Audio</h3>
            <p className="guidelines-upload-artworks__text">Suarte allows galleries to upload an audio file alongside the artwork. While an image can convey a thousand words, sound can enhance and deepen the connection between an artwork and its viewer. In many studies, a multi-sensory approach has been proven to draw in audiences, increase visitor enjoyment of an artwork, and prolong stays.</p>
            <p className="guidelines-upload-artworks__text no-margin">Be creative; you have a maximum of three minutes to get the collector engaged and even more interested in the artwork. Upload or create an audio file where you walk them through the piece as you would in your gallery. Likewise, galleries can encourage artists to send them audio files discussing their pieces.</p>
          </div>

          <div className="guidelines-upload-artworks__separator"/>

          {/* SHIPPING SECTION */}
          <h2 className="guidelines-upload-artworks__heading" id="shipping" ref={shippingSection}>3. Shipping</h2>
          <p className="guidelines-upload-artworks__text">The galleries are responsible for sending original artworks, and Suarte is in charge of production and distribution of the limited editions. Once you receive a purchase order, you have four business days to enter the shipping tracking number.</p>
          <p className="guidelines-upload-artworks__text">Currently, when uploading an artwork, gallery owners must select an estimated national and international shipping cost. Galleries choose whether they assume the costs or charge the end customer to pay the shipping fees.</p>
          <p className="guidelines-upload-artworks__text">Always ensure that the artwork is professionally packaged and well protected for the journey.</p>
        </div>
      </div>
    </>
  );
}
