import DownloadIcon from '@/shared-components/icons/components/gallery-options/DownloadIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/InvoiceCard.css';

export default function InvoiceCard({ invoiceData }) {
  return (
    <>
      <div className="invoice-card__container">
        <Text className="invoice-card__text" large>
          {Utils.getMonthYearFromTimestamp(invoiceData.invoice_start_date)}
        </Text>

        <a 
          href={invoiceData.invoice_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: "inline-flex" }}
          download
        >
          <DownloadIcon className="invoice-card__download-icon"/>
        </a>
      </div>
    </>
  );
}
