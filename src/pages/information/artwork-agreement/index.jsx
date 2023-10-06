import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function ArtworkAgreement() {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="artwork-agreement__page">
        <div className="artwork-agreement__header">
          <BackArrowIcon className="artwork-agreement__back-button" onClick={goBackHandler}/>
          <SuarteName className="artwork-agreement__suartename"/>
        </div>

        <h1 className="artwork-agreement__heading">
          <Heading small>
                        Artwork Agreement
          </Heading>
        </h1>

        <Text className="artwork-agreement__text" paragraph justify medium>
        Section 3 of the following agreement does not apply to artworks uploaded before 2024. 
        </Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    By submitting an artwork to Suarte, the gallery agrees to the following terms and conditions:
        </Text>

        <Text className="artwork-agreement__subheading" large>1. Ownership of Artwork</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
         The gallery warrants and represents that it is the legal owner of the artwork and has the right to enter into this agreement, granting Suarte the right to display and offer the artwork for sale. 
        </Text>

        <Text className="artwork-agreement__subheading" large>2. Intellectual Property Rights</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
        The gallery acknowledges that the artist retains all intellectual property rights, even after the artwork is sold. The gallery pledges to only present artworks to Suarte for which it has secured rights from the legitimate owners and shall bear responsibility for any claims or damages resulting from any breach of this assurance. In such an event, the gallery will defend, indemnify, and hold harmless Suarte.
        </Text>

        <Text className="artwork-agreement__subheading" large>3. Selling in-store</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
        Galleries are welcome to sell artworks both online and in their physical spaces. However, If an artwork is sold directly through the gallery, a reduced commission of 12% applies and is included in the next monthly invoice.
        After the purchase, if the collector wants to claim their artwork on the platform, Galleries must immediately mark the artwork as sold on the platform and provide the collector's email address for proper recording of the transaction and proper management of artwork claims on the platform. 
        In the event that the collector does not want to have the artwork in the platform, Galleries can withdraw the artwork.
        </Text>

        <Text className="artwork-agreement__subheading" large>4. Limited Editions</Text>

        <Text className="artwork-agreement__text" paragraph justify medium>
        In the case of activating Limited Editions, the gallery agrees and acknowledges that it will not produce, manufacture, or distribute any further prints or Limited Editions of the artwork without the express written consent of Suarte. 
        </Text>

        <Text className="artwork-agreement__subheading" large>5. Pricing</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
        The gallery retains complete autonomy in setting the price of the artwork and it must offer the "Buy Now" feature for all artworks uploaded to the platform.
        </Text>

        <Text className="artwork-agreement__subheading" large>6. Price modifications</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
        The gallery is allowed to modify the price of their artwork twice according to the terms of the artwork agreement. However, the new price cannot be lower than 30% of the original uploading price.
        </Text>

        <Text className="artwork-agreement__subheading" large>7. Payment and Invoices</Text>

        <Text className="artwork-agreement__text" paragraph justify medium>
                    Payments from Suarte to Galleries for 
                    original artworks are processed after the 24-hour cancellation policy 
                    has ended, minus Suarte’s 17% commission of the final sale price for 
                    originals, excluding taxes and shipping costs.
        </Text>

        <Text className="artwork-agreement__text" paragraph justify medium>
                    Suarte includes the reduced commission for in-store sales, the income generated from Limited Editions, 
                    and the referral system in the monthly invoice, accessible through the Gallery's profile menu. 
                    If the balance is negative, Galleries must credit the amount within 15 days of receiving the invoice. 
        </Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    Payments and refunds will be credited to the account provided by the Gallery in the "bank account"
                    section inside the platform. The Gallery agrees to keep this information updated, and Suarte is 
                    not responsible if a payment is made to an outdated account.
        </Text>

        <Text className="artwork-agreement__subheading" large>8. Shipping</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    The Gallery is responsible for shipping the artwork to the buyer 
                    and must provide tracking information within 7 days (168 hours) of confirmation. 
                    During the uploading process, the Gallery may choose to assume the shipping costs 
                    or charge the customer for them.
        </Text>

        <Text className="artwork-agreement__subheading" large>9. Returns and Refunds</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    Sellers are responsible for addressing and resolving issues 
                    related to: lost or damaged items, products not as described, quality issues, or receiving 
                    fake goods. Galleries should coordinate with the collector for return shipping arrangements 
                    and provide refunds.
        </Text>

        <Text className="artwork-agreement__subheading" large>10. Legal Compliance</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    The gallery agrees to comply with all the rules and laws related to selling and shipping artwork. 
                    This includes things like export and import regulations, copyright laws, and tax laws.
        </Text>

        <Text className="artwork-agreement__subheading" large>11. Authenticity</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    The gallery guarantees the authenticity of the artwork and that it is an original creation by the artist.
        </Text>

        <Text className="artwork-agreement__subheading" large>12. Artwork Condition</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
        The gallery is responsible for ensuring that the artwork is in the same condition as described on the platform and free from any defects not mentioned in the description.
        </Text>

        <Text className="artwork-agreement__subheading" large>13. Artist's rights protection</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
        The gallery agrees that artists' interests and rights are protected throughout the selling process and beyond.
        </Text>

        <Text className="artwork-agreement__subheading" large>14. Confidentiality</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    Both parties agree to maintain the confidentiality of any sensitive information shared during 
                    the course of the agreement in compliance with GDPR regulations.
        </Text>

        <Text className="artwork-agreement__subheading" large>15. Promotional Use of Artwork</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    The gallery acknowledges and agrees that Suarte may promote and advertise the artwork and 
                    use the photographs of the artwork for advertising purposes, without the need for additional 
                    consent or compensation.
        </Text>

        <Text className="artwork-agreement__subheading" large>16. Responsibilities</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    Each party is responsible for fulfilling its obligations under this agreement. 
                    In the event of a breach, the offending party will be liable for any damages incurred.
        </Text>

        <Text className="artwork-agreement__subheading" large>17. Early termination</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    The agreement may be prematurely terminated due to non-compliance, among other reasons, 
                    which will be determined on a case-by-case basis.
        </Text>

        <Text className="artwork-agreement__subheading" large>18. Dispute Resolution</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    In the event of a dispute arising from or in connection with this agreement, the parties 
                    agree to first attempt to resolve the dispute amicably through negotiation. If the dispute 
                    cannot be resolved through negotiation, the parties agree to submit the dispute to the 
                    exclusive jurisdiction of the courts of Spain.
        </Text>

        <Text className="artwork-agreement__subheading" large>19. Termination</Text>

        <Text className="artwork-agreement__text margin" paragraph justify medium>
                    Suarte reserves the right to terminate this agreement at any time.
        </Text>
        <br></br>
        <Text className="artwork-agreement__text margin" paragraph justify medium>
        By checking the box provided during the artwork uploading process, the gallery agrees to these terms and conditions and acknowledges that this commitment is binding and enforceable under applicable laws and regulations.
        </Text>
      </div>
    </>
  );
}
