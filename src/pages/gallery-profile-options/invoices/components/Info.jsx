import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/Info.css';

export default function Info() {
  return (
    <>
      {/* <Text className="invoices__info-text" medium style={{marginBottom: "14px"}}>
                Current balance:{" "}

                {
                    fetchData.current_balance >= 0 ?
                      <span className="positive">
                        ${Utils.numberWithCommas(fetchData.current_balance)}
                      </span>
                    :
                      <span className="negative">
                        -${Utils.numberWithCommas(fetchData.current_balance*-1)}
                      </span>
                }
            </Text>

            <Text className="invoices__info-text" medium style={{marginBottom: "14px"}}>
                Number of movements:{" "}

                <span>
                    {fetchData.number_of_movements}
                </span>
            </Text> */}

      <Text className="invoices__info-text" medium style={{ marginBottom: "24px" }}>
        Next invoice:{" "}

        <span>
          {Utils.getNextInvoiceDate()}
        </span>
      </Text>
    </>
  );
}
