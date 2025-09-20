import config from '@/config';

async function createInvoice({ price_amount, price_currency = 'USD', order_id, order_description = 'Suarte payment', success_url, cancel_url }) {
  const endpoint = `${config.payments.nowpayments.endpoint}/invoice`;
  const apiKey = config.payments.nowpayments.api_key;

  if (!apiKey) {
    throw new Error('NOWPayments API key is not configured. Set REACT_APP_NOWPAYMENTS_API_KEY.');
  }

  const body = {
    price_amount,
    price_currency,
    order_id,
    order_description,
    success_url,
    cancel_url,
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'Accept': 'application/json'
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data?.message || data?.error || 'Failed to create NOWPayments invoice';
    throw new Error(message);
  }
  return data; // expects { id, invoice_url, ... }
}

const NowPaymentsService = { createInvoice };
export default NowPaymentsService;
