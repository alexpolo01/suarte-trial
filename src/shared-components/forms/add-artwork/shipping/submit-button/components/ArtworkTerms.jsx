import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtworkTerms.css';

export default function ArtworkTerms({ open, close }) {
  return (
    <>
      <PopupToBottomSheet className="artwork-terms" open={open} close={close} popupOptions={{ opacity: true }}>
        <div className="artwork-terms-container">
          <div className="artwork-terms__header">
            <Text className="artwork-terms__header-text" medium>Artwork Terms of Suarte</Text>
            <XIcon className="artwork-terms__close" onClick={close}/>
          </div>

          <div className="artwork-terms__content">
            <Text className="artwork-terms__text" style={{ marginBottom: "10px" }} paragraph justify small>
                            Suarte's Launch Opportunity: All artworks uploaded before 2024 will benefit from Suarte's 0% commission for 
                            in-store sales, and no exclusivity rules apply, only the 17% commission if sold through Suarte. 
            </Text>

            <Text className="artwork-terms__text" style={{ marginBottom: "10px" }} paragraph justify small>
                            Sections 3 and 4 of the following agreement do not apply to artworks uploaded before 2024.
            </Text>

            <Text className="artwork-terms__text" paragraph justify small>
                            By submitting an artwork to Suarte, the gallery agrees to the following terms and conditions:
            </Text>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>1.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Ownership of Artwork:</span> The Gallery warrants and represents that it is the 
                                legal owner of the artwork and has the right to enter into this agreement, granting 
                                Suarte the right to display and offer the artwork for sale. 
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>2.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Intellectual Property Rights:</span> The Gallery acknowledges that the 
                                artist retains all intellectual property rights, even after the artwork is sold. 
                                The Gallery pledges to only present artworks to Suarte for which it has secured rights 
                                from the legitimate owners and shall bear responsibility for any claims or damages 
                                resulting from any breach of this assurance. In such an event, the Gallery will defend, 
                                indemnify, and hold harmless Suarte.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>3.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Artwork exclusivity:</span> The Gallery agrees that the submitted 
                                artwork will be exclusively available for sale on Suarte for a period 
                                of one year from the date of submission. After this period, the agreement 
                                will automatically renew for the same period unless the Gallery, 
                                via the platform, cancels the renewal prior to the conclusion of 
                                the current agreement.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>4.</Text>

              <div>
                <Text className="artwork-terms__text" style={{ marginBottom: "10px" }} paragraph justify small>
                  <span>Selling in-store:</span> Galleries are welcome to sell artworks both online 
                                    and in their physical spaces. However, If an artwork is sold directly through the Gallery, 
                                    a reduced commission of 12% applies, and is included in the next monthly invoice. 
                </Text>

                <Text className="artwork-terms__text" style={{ marginBottom: "10px" }} paragraph justify small>
                                    After the purchase, if the collector wants to claim their artwork on the platform, Galleries 
                                    must immediately mark the artwork as sold on the platform and provide the collector's email 
                                    address for proper recording of the transaction and proper management of artwork claims 
                                    on the platform. 
                </Text>

                <Text className="artwork-terms__text" paragraph justify small>
                                    In the event that the collector does not want to have the artwork on the platform, 
                                    Galleries can withdraw the artwork.
                </Text>
              </div>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>5.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Artwork withdrawal: </span> Galleries can withdraw artworks from the platform at any time. 
                                However, by doing so, a reduced commission of 12% applies, and 
                                is included in the next monthly invoice. 
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>6.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Limited Editions:</span> In the case of activating limited editions, 
                                the Gallery agrees and acknowledges that it will not produce, manufacture, 
                                or distribute any further prints or limited editions of the artwork 
                                without the express written consent of Suarte.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>7.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Pricing:</span> The Gallery retains complete autonomy in setting 
                                the price of the artwork, and it must offer the "Buy Now" 
                                feature for all artworks uploaded to the platform. 
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>8.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Price modifications:</span> The Gallery is allowed to modify the 
                                price of their artwork twice according to the terms of the artwork 
                                agreement. However, the new price cannot be lower than 30% of the 
                                original uploading price.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>9.</Text>

              <div>
                <Text className="artwork-terms__text" style={{ marginBottom: "10px" }} paragraph justify small>
                  <span>Payment and Invoices:</span> Payments from Suarte to Galleries for 
                                    original artworks are processed after the 24-hour cancellation policy 
                                    has ended, minus Suarte’s 17% commission of the final sale price for 
                                    originals, excluding taxes and shipping costs. 
                </Text>

                <Text className="artwork-terms__text" style={{ marginBottom: "10px" }} paragraph justify small>
                                    Suarte includes the reduced commission for in-store sales, the income generated from Limited Editions, 
                                    and the referral system in the monthly invoice, accessible through the Gallery's profile menu. 
                                    If the balance is negative, Galleries must credit the amount within 15 days of receiving the invoice. 
                </Text>

                <Text className="artwork-terms__text" paragraph justify small>
                                    Payments and refunds will be credited to the account provided by the Gallery in the "bank account"
                                    section inside the platform. The Gallery agrees to keep this information updated, and Suarte is 
                                    not responsible if a payment is made to an outdated account. 
                </Text>
              </div>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>10.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Shipping:</span> The Gallery is responsible for shipping the artwork to the buyer 
                                and must provide tracking information within 7 days (168 hours) of confirmation. 
                                During the uploading process, the Gallery may choose to assume the shipping costs 
                                or charge the customer for them.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>11.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Returns and Refunds:</span> Sellers are responsible for addressing and resolving issues 
                                related to: lost or damaged items, products not as described, quality issues, or receiving 
                                fake goods. Galleries should coordinate with the collector for return shipping arrangements 
                                and provide refunds. 
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>12.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Legal Compliance:</span> The gallery agrees to comply with all the rules and 
                                laws related to selling and shipping artwork. This includes things like 
                                export and import regulations, copyright laws, and tax laws.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>13.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Authenticity:</span> The gallery guarantees the authenticity 
                                of the artwork and that it is an original creation by the artist.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>14.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Artwork Condition:</span> The gallery is responsible for ensuring that 
                                the artwork is in the same condition as described on the platform and free 
                                from any defects not mentioned in the description.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>15.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Artist's rights protection:</span> The gallery agrees that artists' 
                                interests and rights are protected throughout the selling process and beyond. 
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>16.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Confidentiality:</span> Both parties agree to maintain the confidentiality of any sensitive 
                                information shared during the course of the agreement in compliance with GDPR regulations.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>17.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Promotional Use of Artwork:</span> The gallery acknowledges and agrees that 
                                Suarte may promote and advertise the artwork and use the photographs of the artwork 
                                for advertising purposes, without the need for additional consent or compensation. 
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>18.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Responsibilities:</span> Each party is responsible for fulfilling its obligations under this agreement. 
                                In the event of a breach, the offending party will be liable for any damages incurred. 
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>19.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Early termination:</span> The agreement may be prematurely terminated due to non-compliance, 
                                among other reasons, which will be determined on a case-by-case basis.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>20.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Dispute Resolution:</span> In the event of a dispute arising from or in 
                                connection with this agreement, the parties agree to first attempt to resolve 
                                the dispute amicably through negotiation. If the dispute cannot be resolved 
                                through negotiation, the parties agree to submit the dispute 
                                to the exclusive jurisdiction of the courts of Spain.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text number" small>21.</Text>

              <Text className="artwork-terms__text" paragraph justify small>
                <span>Termination:</span> Suarte reserves the right to terminate this agreement at any time.
              </Text>
            </div>

            <div className="artwork-terms__text-container">
              <Text className="artwork-terms__text" paragraph justify small>
                                By checking the box provided during the artwork uploading process, 
                                the gallery agrees to these terms and conditions and acknowledges 
                                that this commitment is binding and enforceable under applicable 
                                laws and regulations.
              </Text>
            </div>
          </div>
        </div>
      </PopupToBottomSheet>
    </>
  );
}
