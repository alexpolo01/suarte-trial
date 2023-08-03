import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function LimitedEditionPolicies() {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="limited-edition-policies__page">
        <div className="limited-edition-policies__header">
          <BackArrowIcon className="limited-edition-policies__back-button" onClick={goBackHandler}/>
          <SuarteName className="limited-edition-policies__suartename"/>
        </div>

        <h1 className="limited-edition-policies__heading">
          <Heading small>
                        Suarte Limited Editions Agreement
          </Heading>
        </h1>

        <Text className="limited-edition-policies__subheading" large>1. Requesting Limited Editions (LE)</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    Galleries may request limited editions of their artworks by selecting the appropriate 
                    checkbox when uploading the artwork. Suarte will then evaluate the viability of producing 
                    the L.E prints based on the artwork's characteristics and quality.
        </Text>

        <Text className="limited-edition-policies__subheading" large>2. Manufacturing Exclusivity of LE</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    In case of being accepted, Suarte will be solely responsible for the production and 
                    distribution of the artwork's L.E prints. This process is performed with the explicit 
                    permission of the gallery, which is considered the legal representative of the artwork.
        </Text>

        <Text className="limited-edition-policies__subheading" large>3. Sales Commission</Text>

        <Text className="limited-edition-policies__text" paragraph justify medium>
                    Added to the monthly invoices, Galleries receive 30% of the final sale price 
                    for each L.E. print sold, and it is the galleries responsibility to arrange with 
                    the artist on how to share this income.
        </Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    The compensation will be included on the galleries' monthly invoices issued by Suarte
        </Text>

        <Text className="limited-edition-policies__subheading" large>4. Pricing and Sizing</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    Suarte determines LE prints based on the original's price and size. 
                    The prints are created in up to three different sizes, smaller than the original artwork, 
                    and maintaining the original artwork's proportions.
        </Text>

        <Text className="limited-edition-policies__subheading" large>5. Quality Control</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    Suarte maintains a quality control process for LE prints. 
                    Each print is meticulously examined prior to its release, with 
                    specific attention given to color accuracy, saturation, 
                    and overall print quality.
        </Text>

        <Text className="limited-edition-policies__subheading" large>6. Requirements for LE Activation</Text>

        <Text className="limited-edition-policies__text" paragraph justify medium>
                    Suarte maintains a quality control process for LE prints. 
                    Each print is meticulously examined prior to its release, with 
                    specific attention given to color accuracy, saturation, 
                    and overall print quality.
        </Text>

        <ul>
          <li style={{ color: "white" }}>
            <Text className="limited-edition-policies__text" paragraph justify medium>
                            The inventory status of the artwork must be: Work of Artist.
            </Text>
          </li>

          <li style={{ color: "white" }}>
            <Text className="limited-edition-policies__text" paragraph justify medium>
                            Both dimensions must be larger than 20 cm (7.87 in).
            </Text>
          </li>

          <li style={{ color: "white" }}>
            <Text className="limited-edition-policies__text" paragraph justify medium>
                            The original artwork must be priced at $1250 or above.
            </Text>
          </li>

          <li style={{ color: "white" }}>
            <Text className="limited-edition-policies__text margin" paragraph justify medium>
                            Only square and rectangular canvas sizes are accepted.
            </Text>
          </li>
        </ul>

        <Text className="limited-edition-policies__subheading" large>7. Post-Upload Activation</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    Galleries can activate LE after the artwork has been uploaded and approved, 
                    as long as the original remains unsold. LE are subject to the original 
                    artwork length agreement.
        </Text>

        <Text className="limited-edition-policies__subheading" large>8. Removal of Artworks with Active LE</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    In the event that an artwork with an active LE is removed by the gallery, its LE will no longer be available for sale on Suarte. 
                    If LE prints have already been produced, collectors will be notified that sales for the particular artwork have been discontinued.
        </Text>

        <Text className="limited-edition-policies__subheading" large>9. Legal Liability</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    Galleries hereby warrant that they possess all necessary rights for the production and sale of LE prints, 
                    and will indemnify Suarte against any claims, costs, losses, or damages arising out of a breach of 
                    any warranty, representation, or obligation under this agreement.
        </Text>

        <Text className="limited-edition-policies__subheading" large>10. Dispute Resolution</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    In the event of a dispute arising from or in connection with this agreement, 
                    the parties agree to first attempt to resolve the dispute amicably through negotiation. 
                    If the dispute cannot be resolved through negotiation, the parties agree to submit 
                    the dispute to the exclusive jurisdiction of the courts of Spain.
        </Text>

        <Text className="limited-edition-policies__subheading" large>11. Termination</Text>

        <Text className="limited-edition-policies__text margin" paragraph justify medium>
                    Suarte reserves the right to terminate this agreement at any time, at its sole discretion.
        </Text>

        <Text className="limited-edition-policies__text" paragraph justify medium>
                    This agreement becomes effective upon the Gallery's activation of the LE feature for an artwork on Suarte.
        </Text>
      </div>
    </>
  );
}
